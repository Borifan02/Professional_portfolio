import React, { useState, useEffect, useRef } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import { loadStoredComments, saveStoredComments } from '../../data/blogData';

export default function BlogReaderModal({
  article,
  onClose,
  likesCount = 0,
  isLiked = false,
  onLike,
  isBookmarked = false,
  onBookmark,
  allPosts = [],
  onSelectArticle,
  triggerToast = () => {},
  playClickSound = () => {},
}) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const contentRef = useRef(null);

  // Load comments for this article
  useEffect(() => {
    if (!article) return;
    const allStoredComments = loadStoredComments();
    setComments(allStoredComments[article.id] || []);
  }, [article?.id]);

  // Scroll listener for reading progress bar
  const handleScroll = (e) => {
    const el = e.currentTarget;
    const totalHeight = el.scrollHeight - el.clientHeight;
    if (totalHeight > 0) {
      const current = (el.scrollTop / totalHeight) * 100;
      setScrollPercent(Math.min(100, Math.max(0, current)));
    }
  };

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  // Handle new comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    playClickSound();
    setIsSubmittingComment(true);

    const newComment = {
      id: `comment-${Date.now()}`,
      author: commentName.trim() || 'Software Engineer',
      date: 'Just now',
      text: commentText.trim(),
    };

    const allStored = loadStoredComments();
    const updatedForThisArticle = [newComment, ...(allStored[article.id] || [])];
    allStored[article.id] = updatedForThisArticle;
    saveStoredComments(allStored);

    setComments(updatedForThisArticle);
    setCommentText('');
    setCommentName('');
    setIsSubmittingComment(false);
    triggerToast('Thank you! Your comment has been published.');
  };

  // Share handler
  const handleShare = () => {
    playClickSound();
    const shareUrl = `${window.location.origin}${window.location.pathname}#blog/${article.slug || article.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      triggerToast('Article link copied to clipboard!');
    } else {
      triggerToast(`Share URL: ${shareUrl}`);
    }
  };

  // Related posts
  const relatedPosts = allPosts
    .filter((p) => p.id !== article.id)
    .slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-[115] flex items-center justify-center bg-slate-950/85 p-2 sm:p-4 md:p-6 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/95 shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Scroll Progress Bar */}
        <div
          className="absolute top-0 left-0 z-30 h-1 bg-gradient-to-r from-accent via-cyan-400 to-accentSoft transition-all duration-75"
          style={{ width: `${scrollPercent}%` }}
        />

        {/* Modal Top Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-accent hover:bg-accent/10 hover:text-white"
            >
              <i className="bx bx-arrow-back text-sm" />
              <span>Back</span>
            </button>
            <span className="hidden sm:inline-block rounded-full bg-accent/10 px-3 py-1 text-[11px] font-mono font-semibold uppercase text-accent border border-accent/20">
              {article.category}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Claps */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onLike(article.id);
              }}
              title="Clap for this article"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                isLiked
                  ? 'border-accent bg-accent/20 text-accent font-bold shadow-glow'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-accent hover:text-white'
              }`}
            >
              <i className={`bx ${isLiked ? 'bxs-heart text-rose-400' : 'bx-heart'}`} />
              <span>{likesCount}</span>
            </button>

            {/* Bookmark */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onBookmark(article.id);
              }}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
              className={`inline-flex items-center justify-center h-8 w-8 rounded-full border text-sm transition ${
                isBookmarked
                  ? 'border-accent bg-accent text-slate-950 font-bold'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-accent hover:text-white'
              }`}
            >
              <i className={`bx ${isBookmarked ? 'bxs-bookmark' : 'bx-bookmark'}`} />
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              title="Copy link"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 transition hover:border-accent hover:text-white"
            >
              <i className="bx bx-share-alt" />
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="ml-2 inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/15 bg-white/10 text-slate-300 transition hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/40"
            >
              <i className="bx bx-x text-lg" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Article Content */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10"
        >
          {/* Article Header */}
          <div className="mb-8 border-b border-white/10 pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-accent border border-accent/30">
                {article.category}
              </span>
              <span className="text-xs font-mono text-slate-400">•</span>
              <span className="text-xs font-mono text-slate-400">{article.readTime}</span>
              <span className="text-xs font-mono text-slate-400">•</span>
              <span className="text-xs font-mono text-slate-400">{article.date}</span>
            </div>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="mt-3 text-base text-slate-300 sm:text-lg">
                {article.subtitle}
              </p>
            )}

            {/* Author info card */}
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-accent to-cyan-400 text-base font-black text-slate-950 font-mono">
                  BD
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {article.author?.name || 'Borifan Dabasa'}
                    </span>
                    <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-mono text-accent">
                      Author
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {article.author?.role || 'Full Stack Software Engineer'}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>
                  <i className="bx bx-show mr-1 text-accent" />
                  {article.views || 640} views
                </span>
                <span>
                  <i className="bx bx-time mr-1 text-accent" />
                  {article.readTime}
                </span>
              </div>
            </div>

            {/* Tag Pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {article.tags?.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-accent font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Article Markdown Rendered Content */}
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={article.content} />
          </div>

          {/* Interactive Claps Banner */}
          <div className="my-10 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/15 via-slate-900 to-cyan-500/10 p-6 text-center shadow-glow">
            <h3 className="text-lg font-bold text-white">Did this article add value to your engineering journey?</h3>
            <p className="mt-1 text-xs text-slate-300">
              Support the publication with claps or bookmark it for future reference!
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onLike(article.id);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-accentSoft shadow-lg"
              >
                <i className="bx bxs-heart text-base text-rose-500" />
                <span>Clap ({likesCount})</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
              >
                <i className="bx bx-share-alt" />
                <span>Share Link</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Discussion</span>
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-mono text-accent">
                  {comments.length}
                </span>
              </h3>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your name or handle (e.g. Alex, Tech Lead)"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-xs text-white outline-none focus:border-accent placeholder:text-slate-500"
              />
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your technical perspective, feedback, or question..."
                rows={3}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-xs text-white outline-none focus:border-accent placeholder:text-slate-500 resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingComment || !commentText.trim()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-accentSoft disabled:opacity-50"
                >
                  <i className="bx bx-send" />
                  <span>{isSubmittingComment ? 'Posting...' : 'Post Comment'}</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="mt-6 space-y-4">
              {comments.length === 0 ? (
                <p className="text-center py-6 text-xs text-slate-400">
                  No comments yet. Be the first developer to share thoughts!
                </p>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent font-mono uppercase">
                          {c.author.slice(0, 2)}
                        </div>
                        <span className="text-xs font-bold text-white">{c.author}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">{c.date}</span>
                    </div>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300">
                      {c.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-14 border-t border-white/10 pt-8">
              <h3 className="text-lg font-bold text-white mb-4">Related Technical Articles</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onSelectArticle(rel);
                      if (contentRef.current) contentRef.current.scrollTop = 0;
                    }}
                    className="flex flex-col justify-between text-left rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-accent/40 hover:-translate-y-1 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-accent/10 px-2 py-0.5 text-[10px] font-mono text-accent">
                          {rel.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{rel.readTime}</span>
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-white group-hover:text-accent transition line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                      <span>Read Guide</span>
                      <i className="bx bx-right-arrow-alt" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

