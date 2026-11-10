import React, { useState, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import { calculateReadTime, generateSlug } from '../../data/blogData';

const AVAILABLE_ICONS = [
  { label: 'React', icon: 'bxl-react' },
  { label: 'Node.js', icon: 'bxl-nodejs' },
  { label: 'Code', icon: 'bx-code-curly' },
  { label: 'TypeScript', icon: 'bxl-typescript' },
  { label: 'Terminal', icon: 'bx-terminal' },
  { label: 'Database', icon: 'bx-data' },
  { label: 'Cloud / Server', icon: 'bx-server' },
  { label: 'Spring Boot', icon: 'bxl-spring-boot' },
  { label: 'Docker', icon: 'bxl-docker' },
];

const PRESET_CATEGORIES = [
  'Architecture',
  'Frontend',
  'Backend',
  'Career',
  'DevOps',
  'Database',
  'Full Stack',
];

export default function BlogEditorModal({
  isOpen,
  onClose,
  onSave,
  editingArticle = null,
  triggerToast = () => {},
  playClickSound = () => {},
}) {
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'preview'
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Architecture');
  const [customCategory, setCustomCategory] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('bx-code-curly');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  // Populate if editing
  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title || '');
      setSubtitle(editingArticle.subtitle || '');
      if (PRESET_CATEGORIES.includes(editingArticle.category)) {
        setCategory(editingArticle.category);
        setCustomCategory('');
      } else {
        setCategory('Other');
        setCustomCategory(editingArticle.category || '');
      }
      setTagsInput(editingArticle.tags?.join(', ') || '');
      setSelectedIcon(editingArticle.icon || 'bx-code-curly');
      setSummary(editingArticle.summary || '');
      setContent(editingArticle.content || '');
    } else {
      // Default template for new post
      setTitle('');
      setSubtitle('');
      setCategory('Architecture');
      setCustomCategory('');
      setTagsInput('React, JavaScript, WebDev');
      setSelectedIcon('bx-code-curly');
      setSummary('');
      setContent(`# Your Article Title

*By Borifan Dabasa | Full Stack Developer*

Introduce your topic here. What problem are we solving? Why does it matter to modern software engineering?

## Key Concept 1

Explain your architectural approach or pattern:

\`\`\`javascript
// Example implementation
function processData(items) {
  return items.map(item => ({
    ...item,
    verified: true
  }));
}
\`\`\`

## Key Takeaways

1. Always measure before optimizing.
2. Maintain modular, decoupled boundaries.
3. Test edge cases early.

---

*Questions? Drop a comment below!*`);
    }
  }, [editingArticle, isOpen]);

  if (!isOpen) return null;

  const currentCategory = category === 'Other' ? customCategory.trim() || 'General' : category;
  const currentReadTime = calculateReadTime(content);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      triggerToast('Please provide both a title and article content.');
      return;
    }

    playClickSound();

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const articleData = {
      id: editingArticle?.id || generateSlug(title) || `post-${Date.now()}`,
      slug: editingArticle?.slug || generateSlug(title) || `post-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      category: currentCategory,
      icon: selectedIcon,
      author: {
        name: 'Borifan Dabasa',
        role: 'Full Stack Software Engineer',
        avatar: 'image/me.png',
      },
      date: editingArticle?.date || 'Today',
      readTime: currentReadTime,
      tags: tags.length > 0 ? tags : ['Engineering'],
      summary: summary.trim() || title.trim(),
      content: content.trim(),
      claps: editingArticle?.claps || 0,
      views: editingArticle?.views || 1,
      isBuiltIn: editingArticle?.isBuiltIn || false,
      isCustom: true,
      updatedAt: Date.now(),
    };

    onSave(articleData);
    onClose();
    triggerToast(editingArticle ? 'Article updated successfully!' : 'Article published dynamically!');
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/85 p-2 sm:p-4 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/95 shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-xl text-accent">
              <i className="bx bx-edit-alt" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {editingArticle ? 'Edit Dynamic Article' : 'Write New Dynamic Article'}
              </h2>
              <p className="text-xs text-slate-400">
                Markdown-ready publisher • Persisted to local state immediately
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveTab('write');
                }}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                  activeTab === 'write'
                    ? 'bg-accent text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveTab('preview');
                }}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                  activeTab === 'preview'
                    ? 'bg-accent text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Live Preview
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <i className="bx bx-x text-lg" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {activeTab === 'write' ? (
              <>
                {/* Title & Subtitle */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono font-semibold uppercase text-slate-400 mb-1.5">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Architecting Distributed Microservices with Spring Boot"
                      required
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm text-white outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-slate-400 mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-xs text-white outline-none focus:border-accent"
                    >
                      {PRESET_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="Other">Other / Custom</option>
                    </select>
                    {category === 'Other' && (
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Type custom category name..."
                        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2 text-xs text-white outline-none focus:border-accent"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-slate-400 mb-1.5">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="e.g. Next.js, Architecture, Redis"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-xs text-white outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Cover Icon Picker */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-400 mb-2">
                    Card Badge Icon
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_ICONS.map((item) => (
                      <button
                        key={item.icon}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setSelectedIcon(item.icon);
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs transition ${
                          selectedIcon === item.icon
                            ? 'border-accent bg-accent/20 text-accent font-bold'
                            : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25'
                        }`}
                      >
                        <i className={`bx ${item.icon} text-base`} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Excerpt Summary */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-400 mb-1.5">
                    Excerpt / Brief Summary (Card Preview)
                  </label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={2}
                    placeholder="Brief 1-2 sentence preview shown on the article card..."
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-xs text-white outline-none focus:border-accent resize-none"
                  />
                </div>

                {/* Markdown Content */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-semibold uppercase text-slate-400">
                      Markdown Content *
                    </label>
                    <span className="text-[11px] font-mono text-accent">
                      {currentReadTime} • {content.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    required
                    placeholder="Write your article in Markdown. Supports # headers, ```code fences, lists, > quotes..."
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 p-4 font-mono text-xs text-white outline-none focus:border-accent leading-relaxed resize-y"
                  />
                </div>
              </>
            ) : (
              /* Live Preview */
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 sm:p-8">
                <div className="mb-6 border-b border-white/10 pb-6">
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-mono font-bold text-accent border border-accent/20">
                    {currentCategory}
                  </span>
                  <h1 className="mt-4 text-2xl sm:text-3xl font-black text-white">
                    {title || 'Untitled Dynamic Article'}
                  </h1>
                  <p className="mt-2 text-xs font-mono text-slate-400">
                    By Borifan Dabasa • Today • {currentReadTime}
                  </p>
                </div>
                <MarkdownRenderer content={content} />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-white/10 bg-slate-900/90 px-6 py-4">
            <span className="text-xs font-mono text-slate-400">
              Estimated: <strong className="text-accent">{currentReadTime}</strong>
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-2 text-xs font-bold text-slate-950 transition hover:bg-accentSoft shadow-lg"
              >
                <i className="bx bx-check-circle text-base" />
                <span>{editingArticle ? 'Save Changes' : 'Publish Article'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

