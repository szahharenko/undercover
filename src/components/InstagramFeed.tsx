import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaInstagram } from 'react-icons/fa';

// Subset of the Behold feed payload we actually use.
// Full schema: https://docs.behold.so/widget/json-api/
interface BeholdSize {
  mediaUrl: string;
  width: number;
  height: number;
}

interface BeholdPost {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  thumbnailUrl?: string;
  sizes?: {
    small?: BeholdSize;
    medium?: BeholdSize;
    full?: BeholdSize;
  };
}

interface BeholdFeed {
  username?: string;
  posts: BeholdPost[];
}

const FEED_ID = import.meta.env.VITE_BEHOLD_FEED_ID as string | undefined;
const INSTAGRAM_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE as string | undefined;
const MAX_POSTS = 6;

const pickThumb = (post: BeholdPost): string => {
  // Prefer the small/medium size from Behold's pre-resized URLs to keep
  // the grid lightweight; fall back to the full media or the video poster.
  return (
    post.sizes?.medium?.mediaUrl ||
    post.sizes?.small?.mediaUrl ||
    post.thumbnailUrl ||
    post.mediaUrl
  );
};

const truncateCaption = (caption: string | undefined, maxLen = 110): string => {
  if (!caption) return '';
  const trimmed = caption.trim();
  if (trimmed.length <= maxLen) return trimmed;
  return trimmed.slice(0, maxLen).trimEnd() + '…';
};

const InstagramFeed: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BeholdPost[] | null>(null);
  const [username, setUsername] = useState<string | undefined>(INSTAGRAM_HANDLE);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!FEED_ID) {
      // Component is configured-out via missing env var; render nothing.
      setError('missing-feed-id');
      return;
    }

    let cancelled = false;
    fetch(`https://feeds.behold.so/${FEED_ID}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Behold responded ${res.status}`);
        return res.json() as Promise<BeholdFeed>;
      })
      .then((data) => {
        if (cancelled) return;
        setPosts(data.posts.slice(0, MAX_POSTS));
        if (data.username) setUsername(data.username);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        console.error('Instagram feed error:', err);
        setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // If the feed isn't configured, fail silently so the page keeps working
  // before the env var is set. Other errors also hide the section rather
  // than show a broken empty grid.
  if (error) return null;

  const profileUrl = username
    ? `https://www.instagram.com/${username.replace(/^@/, '')}/`
    : 'https://www.instagram.com/';

  return (
    <section className="py-20 bg-cream" aria-label={t('instagram_feed.aria_label')}>
      <div className="container mx-auto px-4 text-center max-w-[1400px]">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal mb-4"
        >
          <FaInstagram size={100} className='p-4 inline-block' />
          {t('instagram_feed.title')}
        </motion.h2>

        <div className="grid grid-cols-2 mt-8 md:grid-cols-3 gap-4">
          {posts === null
            ? // Loading skeleton — matches the final grid shape so the layout
              // doesn't jump once posts load.
              Array.from({ length: MAX_POSTS }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-charcoal/5 animate-pulse"
                />
              ))
            : posts.map((post, index) => {
                const caption = truncateCaption(post.caption);
                return (
                  <motion.a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="cursor-pointer overflow-hidden rounded-lg shadow-md aspect-square relative group block"
                    aria-label={caption || t('instagram_feed.view_on_instagram')}
                  >
                    <img
                      src={pickThumb(post)}
                      alt={caption || t('instagram_feed.view_on_instagram')}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Hover overlay with caption + IG icon */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/70 transition-colors duration-300 flex flex-col justify-end p-4 text-left">
                      <FaInstagram
                       size={28}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-end mb-2"
                      />
                      {caption && (
                        <p className="text-white text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                          {caption}
                        </p>
                      )}
                    </div>
                  </motion.a>
                );
              })}
        </div>

        <motion.a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-coffee text-cream font-medium hover:bg-charcoal transition-colors"
        >
          <FaInstagram size={20} />
          {username
            ? t('instagram_feed.follow_handle', { handle: `@${username.replace(/^@/, '')}` })
            : t('instagram_feed.follow')}
        </motion.a>
      </div>
    </section>
  );
};

export default InstagramFeed;
