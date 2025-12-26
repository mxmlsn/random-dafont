// GET /api/posters - returns approved posters
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  try {
    // Fetch approved posters from Supabase
    // Show posters that are either from dafont source OR have used_fonts flag (cross-posted from svg)
    const response = await fetch(
      `${supabaseUrl}/rest/v1/posters?status=eq.approved&or=(source.eq.dafont,used_fonts.eq.true)&order=created_at.desc&limit=50`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status}`);
    }

    const posters = await response.json();

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).json(posters);
  } catch (error) {
    console.error('Error fetching posters:', error);
    res.status(500).json({ error: 'Failed to fetch posters' });
  }
}
