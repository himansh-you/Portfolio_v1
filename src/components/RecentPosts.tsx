import React, { useEffect, useRef, useState } from 'react';

declare global { interface Window { twttr?: any } }

interface Props {
  username?: string;  // no '@'
  height?: number;    // iframe height in px
}

const RecentPosts: React.FC<Props> = ({ username = 'heyhimanshyou', height = 560 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const didInit = useRef(false);   // avoid double-run in React StrictMode
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const mount = async () => {
      const render = () => {
        const target = containerRef.current;
        if (!target || !window.twttr?.widgets) return;

        target.innerHTML = ''; // clear previous
        window.twttr.widgets
          .createTimeline(
            { sourceType: 'profile', screenName: username },
            target,
            {
              // HTML data-* map to camelCase options per docs
              dnt: true,
              theme: 'light',
              chrome: 'noheader nofooter noborders transparent',
              height,
              width: '100%',
            }
          )
          .catch(() => setError('Tweets failed to load (possibly rate-limited).'));
      };

      if (window.twttr?.widgets) {
        render();
        return;
      }

      // Load widgets.js once
      const existing = document.getElementById('twitter-wjs') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', render, { once: true });
      } else {
        const s = document.createElement('script');
        s.id = 'twitter-wjs';
        s.src = 'https://platform.twitter.com/widgets.js';
        s.async = true;
        s.defer = true;
        s.onload = render;
        s.onerror = () => setError('Could not load X widget script.');
        document.body.appendChild(s);
      }
    };

    mount();

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [username, height]);

  return (
    <section className="section bg-white py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="px-8 sm:px-6 lg:px-8 mb-2">
          <h2 className="font-lilita text-4xl sm:text-5xl lg:text-6xl text-gray-900">Recent Posts</h2>
        </div>

        <div className="bg-pink-100 border-2 border-gray-900 rounded-3xl p-4 sm:p-6">
          <div ref={containerRef} />
          {error && <p className="mt-4 text-gray-700">{error}</p>}
        </div>

        <div className="text-center mt-4">
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