import React, { useEffect, useState } from 'react';

interface PostItem {
  id: string;
  platform: 'x';
  text: string;
  dateISO: string;
  link: string;
  imageUrl?: string;
}

const RecentPosts: React.FC<{ username?: string }> = ({ username = 'heyhimanshyou' }) => {
  const [posts, setPosts] = useState<PostItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const u = new URL('/api/twitter/recent', window.location.origin);
    u.searchParams.set('limit', '2');
    u.searchParams.set('username', username);
    (async () => {
      try {
        const r = await fetch(u.toString(), { cache: 'no-store' });
        if (!r.ok) throw new Error(await r.text());
        const data = await r.json();
        setPosts(data.posts || []);
      } catch {
        setError('Could not load recent posts. Please try again later.');
      }
    })();
  }, [username]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="section bg-white py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="px-8 sm:px-6 lg:px-8 mb-8">
          <h2 className="font-lilita text-4xl sm:text-5xl lg:text-6xl text-gray-900">Recent Posts</h2>
        </div>

        {!posts && !error && (
          <div className="space-y-6">
            <div className="h-28 bg-pink-100 border-2 border-gray-900 rounded-3xl animate-pulse" />
            <div className="h-28 bg-pink-100 border-2 border-gray-900 rounded-3xl animate-pulse" />
          </div>
        )}
        {error && <p className="text-red-600 mb-6">{error}</p>}

        {posts && (
          <div className="space-y-8">
            {posts.map((post) => (
              <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                <div className="bg-pink-100 border-2 border-gray-900 rounded-3xl overflow-hidden">
                  <div className="grid grid-cols-12">
                    <div className="col-span-12 sm:col-span-3 p-4 flex items-center justify-center border-r-2 border-gray-900">
                      <div className="w-full aspect-video sm:aspect-square bg-pink-200 rounded-2xl overflow-hidden flex items-center justify-center">
                        {post.imageUrl ? (
                          <img src={post.imageUrl} alt="Post preview" className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <span className="font-lilita text-gray-700 text-center px-3">Image related to post</span>
                        )}
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-9 p-6 sm:p-8 relative">
                      <p className="text-gray-900 text-lg leading-relaxed">{post.text}</p>
                      <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-4 sm:right-6">
                        <span className="text-gray-800">{fmt(post.dateISO)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href={`https://x.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gray-900 hover:text-orange-600 font-lilita text-lg"
          >
            Show more →
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;