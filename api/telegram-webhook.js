// POST /api/telegram-webhook - handles Telegram bot callbacks for poster moderation
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Service key for admin operations
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!telegramToken || !supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  // Verify Telegram secret token if configured
  if (webhookSecret) {
    const receivedToken = req.headers['x-telegram-bot-api-secret-token'];
    if (receivedToken !== webhookSecret) {
      console.error('Invalid webhook secret token');
      return res.status(403).json({ error: 'Forbidden' });
    }
  }

  try {
    const update = req.body;

    // Handle callback query (button press)
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const data = callbackQuery.data; // Format: "approve:posterId" or "reject:posterId"
      const messageId = callbackQuery.message.message_id;
      const chatId = callbackQuery.message.chat.id;

      const [action, posterId] = data.split(':');

      if (!posterId || !['approve', 'reject'].includes(action)) {
        await answerCallback(telegramToken, callbackQuery.id, '❌ Invalid action');
        return res.status(200).json({ ok: true });
      }

      // Get current poster status
      const posterResponse = await fetch(
        `${supabaseUrl}/rest/v1/posters?id=eq.${posterId}&select=*`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        }
      );

      const posters = await posterResponse.json();
      if (!posters || posters.length === 0) {
        await answerCallback(telegramToken, callbackQuery.id, '❌ Poster not found');
        return res.status(200).json({ ok: true });
      }

      const poster = posters[0];
      const newStatus = action === 'approve' ? 'approved' : 'rejected';

      // Update poster status in Supabase
      const updateResponse = await fetch(
        `${supabaseUrl}/rest/v1/posters?id=eq.${posterId}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            status: newStatus,
            moderated_at: new Date().toISOString()
          })
        }
      );

      if (!updateResponse.ok) {
        await answerCallback(telegramToken, callbackQuery.id, '❌ Failed to update');
        return res.status(200).json({ ok: true });
      }

      // Update message with new buttons showing current status
      const statusEmoji = newStatus === 'approved' ? '✅' : '❌';
      const statusText = newStatus === 'approved' ? 'APPROVED' : 'REJECTED';

      await editMessageReplyMarkup(telegramToken, chatId, messageId, posterId, newStatus);
      await answerCallback(telegramToken, callbackQuery.id, `${statusEmoji} ${statusText}`);

      return res.status(200).json({ ok: true });
    }

    // No relevant update to process
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return res.status(200).json({ ok: true }); // Always return 200 to Telegram
  }
}

// Answer callback query (acknowledge button press)
async function answerCallback(token, callbackQueryId, text) {
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text: text
    })
  });
}

// Edit message reply markup to show current status
async function editMessageReplyMarkup(token, chatId, messageId, posterId, currentStatus) {
  const keyboard = {
    inline_keyboard: [[
      {
        text: currentStatus === 'approved' ? '✅ Approved' : 'Approve',
        callback_data: `approve:${posterId}`
      },
      {
        text: currentStatus === 'rejected' ? '❌ Rejected' : 'Reject',
        callback_data: `reject:${posterId}`
      }
    ]]
  };

  await fetch(`https://api.telegram.org/bot${token}/editMessageReplyMarkup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      reply_markup: keyboard
    })
  });
}
