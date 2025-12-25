// POST /api/submit-poster - submits a new poster for moderation
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
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

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = fileName.split('.').pop();
    const uniqueFileName = `${timestamp}-${randomStr}.${extension}`;

    // Convert base64 to buffer
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload to Supabase Storage
    const uploadResponse = await fetch(
      `${supabaseUrl}/storage/v1/object/posters/${uniqueFileName}`,
      {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': fileType,
          'x-upsert': 'false'
        },
        body: buffer
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Upload error:', errorText);
      throw new Error('Failed to upload image');
    }

    // Get public URL for the uploaded image
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/posters/${uniqueFileName}`;

    // Clean instagram handle
    let cleanInstagram = instagram ? instagram.trim() : null;
    if (cleanInstagram && !cleanInstagram.startsWith('@')) {
      cleanInstagram = '@' + cleanInstagram;
    }

    // Insert poster record into database
    const insertResponse = await fetch(
      `${supabaseUrl}/rest/v1/posters`,
      {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
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

    res.status(201).json({ success: true, message: 'Poster submitted for review' });
  } catch (error) {
    console.error('Error submitting poster:', error);
    res.status(500).json({ error: error.message || 'Failed to submit poster' });
  }
}
