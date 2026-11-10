import React, { useState, useEffect, useRef } from 'react';

export default function AudioSoundscapeModal({
  isOpen,
  onClose,
  triggerToast = () => {},
}) {
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(0.25);
  const [selectedDrone, setSelectedDrone] = useState('focus'); // 'focus' | 'cyber'

  const audioCtxRef = useRef(null);
  const oscNodesRef = useRef([]);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    return () => {
      stopAmbientSynth();
    };
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const startAmbientSynth = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      stopAmbientSynth();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(ambientVolume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Frequencies for soothing harmonic chords (A minor / Cyber Ambient)
      const frequencies = selectedDrone === 'focus' ? [220, 261.63, 329.63, 440] : [110, 164.81, 220, 329.63];

      const nodes = frequencies.map((freq, index) => {
        const osc = ctx.createOscillator();
        const nodeGain = ctx.createGain();

        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low pass filter for soft analog warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        nodeGain.gain.setValueAtTime(0.08 / frequencies.length, ctx.currentTime);

        osc.connect(filter);
        filter.connect(nodeGain);
        nodeGain.connect(masterGain);

        osc.start();
        return osc;
      });

      oscNodesRef.current = nodes;
      setIsPlayingSynth(true);
      triggerToast('Cyber Ambient Focus Soundscape started 🎧');
    } catch {
      triggerToast('Audio initialization failed.');
    }
  };

  const stopAmbientSynth = () => {
    if (oscNodesRef.current.length > 0) {
      oscNodesRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      oscNodesRef.current = [];
    }
    setIsPlayingSynth(false);
  };

  const handleVolumeChange = (newVol) => {
    setAmbientVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[125] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent text-xl">
              <i className="bx bx-headphone" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Focus Soundscape Synthesizer</h3>
              <p className="text-xs text-slate-400">Native Web Audio harmonic ambient generator</p>
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

        {/* Audio Visualizer Equalizer Simulation */}
        <div className="mt-6 flex h-20 items-end justify-center gap-1.5 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
          {[40, 65, 30, 85, 50, 95, 70, 45, 80, 60, 35, 75].map((h, i) => (
            <span
              key={i}
              className={`w-2 rounded-t-full transition-all duration-300 ${
                isPlayingSynth ? 'bg-gradient-to-t from-accent to-cyan-400' : 'bg-white/10'
              }`}
              style={{
                height: isPlayingSynth ? `${Math.max(15, (h * (ambientVolume * 2)) % 100)}%` : '15%',
              }}
            />
          ))}
        </div>

        {/* Soundscape presets */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
              Harmonic Drone Key
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedDrone('focus');
                  if (isPlayingSynth) setTimeout(startAmbientSynth, 50);
                }}
                className={`rounded-xl border p-2.5 text-xs font-semibold transition ${
                  selectedDrone === 'focus'
                    ? 'border-accent bg-accent/15 text-white shadow-glow'
                    : 'border-white/10 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                Deep Focus (432Hz Chord)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedDrone('cyber');
                  if (isPlayingSynth) setTimeout(startAmbientSynth, 50);
                }}
                className={`rounded-xl border p-2.5 text-xs font-semibold transition ${
                  selectedDrone === 'cyber'
                    ? 'border-accent bg-accent/15 text-white shadow-glow'
                    : 'border-white/10 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                Cyber Midnight Drone
              </button>
            </div>
          </div>

          {/* Volume Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span>Output Volume</span>
              <span className="text-accent">{Math.round(ambientVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.6"
              step="0.05"
              value={ambientVolume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Control Button */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[11px] font-mono text-slate-500">Zero audio assets • 100% synthesized in-browser</span>
          <button
            type="button"
            onClick={isPlayingSynth ? stopAmbientSynth : startAmbientSynth}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition shadow-lg ${
              isPlayingSynth
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-accent text-slate-950 hover:bg-accentSoft'
            }`}
          >
            <i className={`bx ${isPlayingSynth ? 'bx-pause' : 'bx-play'} text-base`} />
            <span>{isPlayingSynth ? 'Stop Soundscape' : 'Play Soundscape'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

