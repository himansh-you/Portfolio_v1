// api/twitter/recent.js
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API = 'https://api.twitter.com/2';

async function loadFallback() {
  try {
    const p = path.join(__dirname, '../../public/recentPosts.json');
    const raw = await readFile(p, 'utf8');
    const json = JSON.parse(raw);
    return Array.isArray(json?.posts) ? json.posts : [];
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  try {
    const bearer = process.env.TWITTER_BEARER_TOKEN;
    if (!bearer) return res.status(500).json({ error: 'Missing TWITTER_BEARER_TOKEN' });

    const username = req.query.username || process.env.TWITTER_DEFAULT_USERNAME;
    const limit = Math.min(Math.max(parseInt(req.query.limit || '2', 10), 1), 10);
    if (!username) return res.status(400).json({ error: 'username is required' });

    const uResp = await fetch(`${API}/users/by/username/${encodeURIComponent(username)}`, {
      headers: { Authorization: `Bearer ${bearer}` }
    });

    if (uResp.status === 429) {
      const posts = await loadFallback();
      res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=86400');
      return res.status(200).json({ posts });
    }
    if (!uResp.ok) return res.status(uResp.status).json({ error: await uResp.text() });

    const u = await uResp.json();
    const userId = u?.data?.id;
    if (!userId) return res.status(404).json({ error: 'User not found' });

    const params = new URLSearchParams({
      max_results: String(limit, 5), // keep minimal
      'tweet.fields': 'created_at,attachments,text',
      expansions: 'attachments.media_keys',
      'media.fields': 'url,preview_image_url,type,width,height'
    });
    params.set('exclude', 'replies,retweets');

    const tResp = await fetch(`${API}/users/${userId}/tweets?${params.toString()}`, {
      headers: { Authorization: `Bearer ${bearer}` }
    });

    if (tResp.status === 429) {
      const posts = await loadFallback();
      res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=86400');
      return res.status(200).json({ posts });
    }
    if (!tResp.ok) return res.status(tResp.status).json({ error: await tResp.text() });

    const data = await tResp.json();
    const media = (data.includes?.media) || [];
    const mediaMap = new Map(media.map(m => [m.media_key, m]));

    const posts = (data.data || []).slice(0, limit).map((t) => {
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

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ posts });
  } catch (e) {
    res.status(500).json({ error: e?.message || 'Unknown error' });
  }
}