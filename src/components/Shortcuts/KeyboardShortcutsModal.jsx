import React, { useEffect } from 'react';

const SHORTCUT_GROUPS = [
  {
    category: 'Global & Navigation',
    items: [
      { key: 'Ctrl + K', desc: 'Open Command Palette' },
      { key: '?', desc: 'Toggle Keyboard Shortcuts HUD' },
      { key: 'H', desc: 'Jump to Hero / Top' },
      { key: 'P', desc: 'Jump to Projects & Portfolio' },
      { key: 'A', desc: 'Jump to System Architecture' },
      { key: 'D', desc: 'Jump to Dev Lab API Console' },
      { key: 'E', desc: 'Jump to Project Estimator' },
      { key: 'R', desc: 'Jump to Production Tech Radar' },
      { key: 'G', desc: 'Jump to Live GitHub Pulse' },
      { key: 'Q', desc: 'Jump to Interview Q&A' },
      { key: 'B', desc: 'Jump to Dynamic Blog' },
      { key: 'C', desc: 'Jump to Contact Section' },
    ],
  },
  {
    category: 'Experience & Controls',
    items: [
      { key: 'T', desc: 'Toggle Terminal / Visual Mode' },
      { key: 'M', desc: 'Toggle Light / Dark Mode' },
      { key: 'S', desc: 'Toggle Sound Effects' },
      { key: 'Esc', desc: 'Dismiss Active Modal / Reader' },
    ],
  },
];

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[125] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-xl text-accent">
              <i className="bx bx-command" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Keyboard Shortcuts HUD</h3>
              <p className="text-xs text-slate-400">Power user keyboard navigation</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white"
          >
            <i className="bx bx-x text-lg" />
          </button>
        </div>

        <div className="mt-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.category}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-3">
                {group.category}
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {group.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-2.5 px-3"
                  >
                    <span className="text-xs text-slate-300">{item.desc}</span>
                    <kbd className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[11px] font-bold text-white shadow-sm">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Tip: Press <strong className="text-slate-300">?</strong> anytime to show/hide this cheat sheet.</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 px-4 py-1 text-xs font-semibold text-white hover:bg-white/20 transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

