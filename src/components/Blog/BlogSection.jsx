import React, { useState, useMemo } from 'react';

export default function BlogSection({
  posts = [],
  likes = {},
  bookmarks = [],
  onOpenArticle,
  onLike,
  onBookmark,
  onOpenEditor,
  onEditArticle,
  onDeleteArticle,
  onResetPosts,
  triggerToast = () => { },
  playClickSound = () => { },
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'claps' | 'readTime'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Categories with counts
  const categoriesWithCounts = useMemo(() => {
    const map = {};
    posts.forEach((p) => {
      const cat = p.category || 'General';
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  }, [posts]);

  // All distinct tags
  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      p.tags?.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, [posts]);

  // Filter & Sort
  const filteredPosts = useMemo(() => {
    let list = [...posts];

    // Filter by bookmarks
    if (onlySaved) {
      list = list.filter((p) => bookmarks.includes(p.id));
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by tag
    if (selectedTag) {
      list = list.filter((p) =>
        p.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase()),
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)) ||
          p.content?.toLowerCase().includes(q),
      );
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'claps') {
        const clapsA = (a.claps || 0) + (likes[a.id] ? 1 : 0);
        const clapsB = (b.claps || 0) + (likes[b.id] ? 1 : 0);
        return clapsB - clapsA;
      }
      if (sortBy === 'readTime') {
        const getMins = (str = '') => parseInt(str) || 5;
        return getMins(a.readTime) - getMins(b.readTime);
      }
      // 'newest' default
      if (a.isCustom && !b.isCustom) return -1;
      if (!a.isCustom && b.isCustom) return 1;
      return (b.updatedAt || 0) - (a.updatedAt || 0);
    });

    return list;
  }, [posts, onlySaved, selectedCategory, selectedTag, searchQuery, sortBy, likes, bookmarks]);

  // Total estimated read time for visible posts
  const totalReadMins = useMemo(() => {
    return filteredPosts.reduce((acc, p) => acc + (parseInt(p.readTime) || 6), 0);
  }, [filteredPosts]);

  return (
    <section id="blog" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Header with Title and Quick Actions */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
              Dynamic Engineering Hub
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Technical Publications & Guides
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
            Interactive engineering articles on full-stack architecture, API hardening, and modern software workflows.
            Read inside the app, clap, search, leave thoughts, or compose new guides.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenEditor();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-accentSoft shadow-glow"
          >
            <i className="bx bx-plus text-base" />
            <span>Write Article</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setOnlySaved(!onlySaved);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition ${onlySaved
              ? 'border-accent bg-accent/20 text-accent font-bold'
              : 'border-white/10 bg-white/5 text-slate-300 hover:border-accent hover:text-white'
              }`}
          >
            <i className={`bx ${onlySaved ? 'bxs-bookmark' : 'bx-bookmark'}`} />
            <span>Saved ({bookmarks.length})</span>
          </button>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode('grid');
              }}
              title="Grid View"
              className={`rounded-full p-1.5 text-sm transition ${viewMode === 'grid'
                ? 'bg-accent text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <i className="bx bx-grid-alt" />
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode('list');
              }}
              title="List View"
              className={`rounded-full p-1.5 text-sm transition ${viewMode === 'list'
                ? 'bg-accent text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <i className="bx bx-list-ul" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-lg">
            <i className="bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by title, code topics, tags..."
              className="w-full rounded-full border border-white/10 bg-slate-900/80 py-3 pl-11 pr-10 text-xs text-white placeholder:text-slate-400 outline-none focus:border-accent shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <i className="bx bx-x text-base" />
              </button>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs font-mono text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                playClickSound();
                setSortBy(e.target.value);
              }}
              className="rounded-full border border-white/10 bg-slate-900/90 px-4 py-2 text-xs font-medium text-white outline-none focus:border-accent"
            >
              <option value="newest">Featured & Latest</option>
              <option value="claps">Most Clapped</option>
              <option value="readTime">Quick Reads First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedCategory('all');
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${selectedCategory === 'all'
              ? 'bg-accent text-slate-950 font-bold shadow-glow'
              : 'border border-white/10 bg-white/5 text-slate-300 hover:border-accent/40 hover:text-white'
              }`}
          >
            All Guides ({posts.length})
          </button>

          {Object.entries(categoriesWithCounts).map(([cat, count]) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat);
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-accent text-slate-950 font-bold shadow-glow'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:border-accent/40 hover:text-white'
                }`}
            >
              <span>{cat}</span>
              <span className="ml-1.5 opacity-60 text-[10px]">({count})</span>
            </button>
          ))}

          {/* Active Tag filter indicator */}
          {selectedTag && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent/20 px-3 py-1 text-xs text-accent font-mono font-bold">
              <span>#{selectedTag}</span>
              <button
                type="button"
                onClick={() => setSelectedTag('')}
                className="hover:text-white"
              >
                <i className="bx bx-x text-sm" />
              </button>
            </span>
          )}
        </div>

        {/* Results summary bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
          <span>
            Showing <strong className="text-white">{filteredPosts.length}</strong> of{' '}
            <strong className="text-white">{posts.length}</strong> publications •{' '}
            <strong className="text-accent">{totalReadMins} min</strong> total read time
          </span>

          {posts.some((p) => p.isCustom) && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset articles back to default publications? Custom posts will be cleared.')) {
                  onResetPosts();
                  triggerToast('Articles reset to default seed guides.');
                }
              }}
              className="hover:text-rose-400 transition"
            >
              Reset Seed Articles
            </button>
          )}
        </div>
      </div>

      {/* Publications Grid / List */}
      {filteredPosts.length === 0 ? (
        <div className="mt-12 rounded-[2rem] border border-white/10 bg-slate-900/40 p-12 text-center backdrop-blur-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl text-accent">
            <i className="bx bx-file-blank" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white">No Publications Found</h3>
          <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto">
            No articles match your current search query or active category filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedTag('');
              setOnlySaved(false);
            }}
            className="mt-5 rounded-full bg-accent/20 border border-accent/40 px-5 py-2 text-xs font-bold text-accent hover:bg-accent hover:text-slate-950 transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const postLikes = (post.claps || 0) + (likes[post.id] ? 1 : 0);
            const isBookmarked = bookmarks.includes(post.id);

            return (
              <article
                key={post.id}
                className="group relative flex flex-col justify-between rounded-[2rem] border border-white/10 bg-slate-900/70 p-7 shadow-glow transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 backdrop-blur-xl"
              >
                <div>
                  {/* Top Bar: Icon, Category & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-2xl text-accent transition group-hover:scale-110 group-hover:bg-accent/20">
                      <i className={`bx ${post.icon || 'bx-code-curly'}`} />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {post.isCustom && (
                        <div className="flex items-center gap-1 mr-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playClickSound();
                              onEditArticle(post);
                            }}
                            title="Edit Article"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-300 hover:text-accent hover:bg-white/10 text-xs transition"
                          >
                            <i className="bx bx-edit" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playClickSound();
                              if (window.confirm(`Delete "${post.title}"?`)) {
                                onDeleteArticle(post.id);
                              }
                            }}
                            title="Delete Article"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 text-xs transition"
                          >
                            <i className="bx bx-trash" />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playClickSound();
                          onBookmark(post.id);
                        }}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs transition ${isBookmarked
                          ? 'border-accent bg-accent text-slate-950 font-bold'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:border-accent hover:text-white'
                          }`}
                      >
                        <i className={`bx ${isBookmarked ? 'bxs-bookmark' : 'bx-bookmark'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Meta Bar */}
                  <div className="mt-5 flex items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-accent uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">•</span>
                    <span className="text-[11px] font-mono text-slate-400">{post.readTime}</span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3
                    onClick={() => {
                      playClickSound();
                      onOpenArticle(post);
                    }}
                    className="mt-3 cursor-pointer text-lg font-bold text-white transition group-hover:text-accent line-clamp-2"
                  >
                    {post.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300 line-clamp-3">
                    {post.summary}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags?.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playClickSound();
                          setSelectedTag(t);
                        }}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-accent hover:bg-accent/15 transition font-mono"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      onLike(post.id);
                    }}
                    title="Clap for this article"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition font-mono"
                  >
                    <i className={`bx ${likes[post.id] ? 'bxs-heart text-rose-500' : 'bx-heart'} text-sm`} />
                    <span>{postLikes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onOpenArticle(post);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent transition hover:translate-x-1"
                  >
                    <span>Read Article</span>
                    <i className="bx bx-right-arrow-alt text-base" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="mt-8 space-y-4">
          {filteredPosts.map((post) => {
            const postLikes = (post.claps || 0) + (likes[post.id] ? 1 : 0);
            const isBookmarked = bookmarks.includes(post.id);

            return (
              <article
                key={post.id}
                onClick={() => {
                  playClickSound();
                  onOpenArticle(post);
                }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-glow transition hover:border-accent/40 hover:-translate-y-0.5 backdrop-blur-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-2xl text-accent transition group-hover:bg-accent/20">
                    <i className={`bx ${post.icon || 'bx-code-curly'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-accent/10 px-2 py-0.5 text-[10px] font-mono text-accent">
                        {post.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{post.readTime}</span>
                      <span className="text-[11px] font-mono text-slate-500">•</span>
                      <span className="text-[11px] font-mono text-slate-400">{post.date}</span>
                    </div>
                    <h3 className="mt-1.5 text-base font-bold text-white transition group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 line-clamp-1">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      onLike(post.id);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 font-mono hover:border-accent"
                  >
                    <i className={`bx ${likes[post.id] ? 'bxs-heart text-rose-500' : 'bx-heart'}`} />
                    <span>{postLikes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      onBookmark(post.id);
                    }}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs transition ${isBookmarked
                      ? 'border-accent bg-accent text-slate-950 font-bold'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-accent hover:text-white'
                      }`}
                  >
                    <i className={`bx ${isBookmarked ? 'bxs-bookmark' : 'bx-bookmark'}`} />
                  </button>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent transition group-hover:translate-x-1">
                    <span>Read</span>
                    <i className="bx bx-right-arrow-alt text-base" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

