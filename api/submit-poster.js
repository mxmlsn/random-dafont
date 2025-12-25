// POST /api/submit-poster - submits a new poster for moderation
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
  const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
    return res.status(500).json({ error: 'Cloudinary not configured' });
  }

  try {
    const { nickname, instagram, imageBase64, fileName, fileType } = req.body;

    // Validate required fields
    if (!nickname || !imageBase64 || !fileName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate nickname length
    if (nickname.length > 50) {
      return res.status(400).json({ error: 'Nickname too long' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    // Validate base64 size (roughly 5MB limit)
    const base64Size = imageBase64.length * 0.75;
    if (base64Size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'File too large (max 5MB)' });
    }

    // Generate unique public_id for Cloudinary (no slashes - folder handles path)
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const publicId = `poster-${timestamp}-${randomStr}`;

    // Upload to Cloudinary
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          file: imageBase64,
          upload_preset: 'unsigned_posters',
          public_id: publicId
        })
      }
    );

    if (!cloudinaryResponse.ok) {
      const errorData = await cloudinaryResponse.json();
      console.error('Cloudinary upload error:', errorData);
      throw new Error('Failed to upload image');
    }

    const cloudinaryData = await cloudinaryResponse.json();
    const imageUrl = cloudinaryData.secure_url;

    // Clean instagram handle
    let cleanInstagram = instagram ? instagram.trim() : null;
    if (cleanInstagram && !cleanInstagram.startsWith('@')) {
      cleanInstagram = '@' + cleanInstagram;
    }

    // Insert poster record into Supabase database and get the ID
    const insertResponse = await fetch(
      `${supabaseUrl}/rest/v1/posters`,
      {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          nickname: nickname.trim(),
          instagram: cleanInstagram,
          image_url: imageUrl,
          status: 'pending'
        })
      }
    );

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();
      console.error('Insert error:', errorText);
      throw new Error('Failed to save poster data');
    }

    const insertedData = await insertResponse.json();
    const posterId = insertedData[0]?.id;

    // Send Telegram notification if configured
    if (telegramBotToken && telegramChatId && posterId) {
      await sendTelegramNotification(
        telegramBotToken,
        telegramChatId,
        posterId,
        nickname.trim(),
        cleanInstagram,
        imageUrl
      );
    }

    res.status(201).json({ success: true, message: 'Poster submitted for review' });
  } catch (error) {
    console.error('Error submitting poster:', error);
    res.status(500).json({ error: error.message || 'Failed to submit poster' });
  }
}

// Send poster notification to Telegram with moderation buttons
async function sendTelegramNotification(token, chatId, posterId, nickname, instagram, imageUrl) {
  try {
    const caption = `🎨 New poster submission!\n\n` +
      `👤 Author: ${nickname}\n` +
      (instagram ? `📷 Instagram: ${instagram}\n` : '') +
      `\n🆔 ID: ${posterId}`;

    const keyboard = {
      inline_keyboard: [[
        { text: '✅ Approve', callback_data: `approve:${posterId}` },
        { text: '❌ Reject', callback_data: `reject:${posterId}` }
      ]]
    };

    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: imageUrl,
        caption: caption,
        reply_markup: keyboard
      })
    });
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    // Don't throw - telegram notification is not critical
  }
}
