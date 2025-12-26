// POST /api/submit-poster - submits a new poster for moderation
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // For bypassing RLS to get poster ID
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
    const { instagram, fonts, usedSvg, imageBase64, fileName, fileType } = req.body;

    // Validate required fields
    if (!imageBase64 || !fileName) {
      return res.status(400).json({ error: 'Missing required fields' });
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

    // Clean instagram handle (remove @ if present)
    let cleanInstagram = instagram ? instagram.trim() : null;
    if (cleanInstagram && cleanInstagram.startsWith('@')) {
      cleanInstagram = cleanInstagram.substring(1);
    }
    // Make it null if empty string
    if (!cleanInstagram) {
      cleanInstagram = null;
    }

    // Prepare fonts array (ensure it's valid JSON)
    const fontsArray = fonts && Array.isArray(fonts) ? fonts : [];

    // Insert poster record into Supabase database
    // Use service key if available (bypasses RLS), otherwise use anon key
    const insertKey = supabaseServiceKey || supabaseKey;
    const insertResponse = await fetch(
      `${supabaseUrl}/rest/v1/posters`,
      {
        method: 'POST',
        headers: {
          'apikey': insertKey,
          'Authorization': `Bearer ${insertKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          instagram: cleanInstagram,
          fonts: fontsArray,
          used_svg: usedSvg || false,
          used_fonts: true, // Always true since submitted from dafont site
          image_url: imageUrl,
          status: 'pending',
          source: 'dafont'
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
        cleanInstagram,
        fontsArray,
        usedSvg,
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
async function sendTelegramNotification(token, chatId, posterId, instagram, fonts, usedSvg, imageUrl) {
  try {
    // Line 1: source
    const sourceLine = usedSvg ? 'dafont + svg' : 'dafont';

    // Line 2: author with hyperlink (or anonymous)
    const authorLine = instagram
      ? `<a href="https://instagram.com/${instagram}">@${instagram}</a>`
      : 'anonymous';

    // Line 3: fonts
    const fontsLine = fonts && fonts.length > 0 ? `\n${fonts.join(', ')}` : '';

    const caption = `${sourceLine}\n${authorLine}${fontsLine}`;

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
        parse_mode: 'HTML',
        reply_markup: keyboard
      })
    });
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    // Don't throw - telegram notification is not critical
  }
}
