import React, { useState } from 'react';

// Formatter for inline Markdown: bold, italic, inline code, links
function renderInline(text = '') {
  if (!text) return null;

  // Split text by tokens: `code`, **bold**, *italic*, [link](url)
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline code
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={index}
          className="mx-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-accent font-medium"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={index} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={index} className="italic text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Markdown link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4 decoration-accent/40 transition hover:decoration-accent hover:text-accentSoft"
        >
          {linkText}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative my-6 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/90 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {language || 'code'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-accent hover:bg-accent/10 hover:text-white"
        >
          <i className={`bx ${copied ? 'bx-check text-accent' : 'bx-copy'}`} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function MarkdownRenderer({ content = '' }) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let codeLang = '';
  let inList = false;
  let listItems = [];
  let listType = 'ul'; // 'ul' or 'ol'

  function flushList() {
    if (inList && listItems.length > 0) {
      if (listType === 'ol') {
        elements.push(
          <ol key={`ol-${elements.length}`} className="my-4 list-decimal space-y-2 pl-6 text-slate-300">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {renderInline(item)}
              </li>
            ))}
          </ol>,
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-4 list-disc space-y-2 pl-6 text-slate-300">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {renderInline(item)}
              </li>
            ))}
          </ul>,
        );
      }
      listItems = [];
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check code fence
    if (trimmed.startsWith('```')) {
      flushList();
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = trimmed.slice(3).trim();
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        elements.push(
          <CodeBlock
            key={`code-${elements.length}`}
            code={codeBuffer.join('\n')}
            language={codeLang}
          />,
        );
        codeBuffer = [];
        codeLang = '';
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Blank line
    if (!trimmed) {
      flushList();
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      flushList();
      elements.push(<hr key={`hr-${elements.length}`} className="my-8 border-t border-white/10" />);
      continue;
    }

    // Headings
    if (trimmed.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4 key={`h4-${elements.length}`} className="mt-6 mb-2 text-base font-bold text-white">
          {renderInline(trimmed.slice(5))}
        </h4>,
      );
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="mt-8 mb-3 text-lg sm:text-xl font-bold text-white">
          {renderInline(trimmed.slice(4))}
        </h3>,
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="mt-10 mb-4 border-b border-white/10 pb-2 text-xl sm:text-2xl font-black text-white"
        >
          {renderInline(trimmed.slice(3))}
        </h2>,
      );
      continue;
    }

    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h1
          key={`h1-${elements.length}`}
          className="mt-4 mb-4 text-2xl sm:text-3xl font-black tracking-tight text-white"
        >
          {renderInline(trimmed.slice(2))}
        </h1>,
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote
          key={`quote-${elements.length}`}
          className="my-5 rounded-r-2xl border-l-4 border-accent bg-accent/5 p-4 text-sm sm:text-base italic text-slate-300"
        >
          {renderInline(trimmed.slice(2))}
        </blockquote>,
      );
      continue;
    }

    // Unordered list item (- or *)
    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listItems.push(ulMatch[1]);
      continue;
    }

    // Ordered list item (e.g. 1. )
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listItems.push(olMatch[1]);
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={`p-${elements.length}`} className="my-3 text-sm sm:text-base leading-relaxed text-slate-300">
        {renderInline(trimmed)}
      </p>,
    );
  }

  // End flush
  flushList();
  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <CodeBlock
        key={`code-${elements.length}`}
        code={codeBuffer.join('\n')}
        language={codeLang}
      />,
    );
  }

  return <div className="space-y-1 text-slate-300">{elements}</div>;
}

