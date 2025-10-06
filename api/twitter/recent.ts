import type { VercelRequest, VercelResponse } from '@vercel/node';

const API = 'https://api.twitter.com/2';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const bearer = process.env.TWITTER_BEARER_TOKEN;
    if (!bearer) return res.status(500).json({ error: 'Missing TWITTER_BEARER_TOKEN' });

    const username = (req.query.username as string) || process.env.TWITTER_DEFAULT_USERNAME;
    const limit = Math.min(Math.max(parseInt((req.query.limit as string) || '2', 10), 1), 10);
    if (!username) return res.status(400).json({ error: 'username is required' });

    // 1) Resolve user id
    const uResp = await fetch(`${API}/users/by/username/${encodeURIComponent(username)}`, {
      headers: { Authorization: `Bearer ${bearer}` }
    });
    if (!uResp.ok) return res.status(uResp.status).json({ error: await uResp.text() });
    const u = await uResp.json();
    const userId = u?.data?.id;
    if (!userId) return res.status(404).json({ error: 'User not found' });

    // 2) Fetch recent tweets (exclude replies/retweets) + media expansion
    const params = new URLSearchParams({
      max_results: String(Math.max(limit, 5)),                    // room for filtering
      'tweet.fields': 'created_at,attachments,text',
      expansions: 'attachments.media_keys',
      'media.fields': 'url,preview_image_url,type,width,height'
    });
    params.append('exclude', 'replies');
    params.append('exclude', 'retweets');

    const tResp = await fetch(`${API}/users/${userId}/tweets?${params.toString()}`, {
      headers: { Authorization: `Bearer ${bearer}` }
    });
    if (!tResp.ok) return res.status(tResp.status).json({ error: await tResp.text() });
    const data = await tResp.json();

    const media = (data.includes?.media as any[]) || [];
    const mediaMap = new Map<string, any>();
    media.forEach((m) => mediaMap.set(m.media_key, m));

    const posts = (data.data || []).slice(0, limit).map((t: any) => {
      const key = t.attachments?.media_keys?.[0];
      const m = key ? mediaMap.get(key) : null;
      const imageUrl = m?.url || m?.preview_image_url || undefined;
      return {
        id: `x_${t.id}`,
        platform: 'x',
        text: t.text,
        dateISO: t.created_at,
        link: `https://x.com/${username}/status/${t.id}`,
        imageUrl
      };
    });

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json({ posts });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Unknown error' });
  }
}