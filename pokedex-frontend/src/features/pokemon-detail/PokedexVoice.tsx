import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Square, AudioLines, Volume2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

interface PokedexVoiceProps {
  description: string;
  accentColor: string;
  cry?: string | null;
}

export const PokedexVoice: React.FC<PokedexVoiceProps> = ({ description, accentColor, cry }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        setVoices(window.speechSynthesis.getVoices());
      }
    };
    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!description) return;

    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(description);
    
    const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    const pokedexVoice = 
      englishVoices.find(v => v.name.toLowerCase().includes('google uk english female')) ||
      englishVoices.find(v => v.name.toLowerCase().includes('google us english')) ||
      englishVoices.find(v => v.name.toLowerCase().includes('zira')) ||
      englishVoices[0];

    if (pokedexVoice) utterance.voice = pokedexVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    utterance.onstart = () => { setIsSpeaking(true); setIsPaused(false); };
    utterance.onend = () => { setIsSpeaking(false); setIsPaused(false); };
    utterance.onerror = () => { setIsSpeaking(false); setIsPaused(false); };

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const playCry = () => {
    if (!cry) return;
    const audio = new Audio(cry);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 p-5 border border-white/5 backdrop-blur-md">
      {/* Soundwave animation */}
      <AnimatePresence>
        {isSpeaking && !isPaused && (
          <div className="absolute top-4 right-4 flex items-end gap-1 h-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 20, 8, 24, 6] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                className="w-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 mb-3 text-slate-500 uppercase tracking-widest text-[10px] font-black">
        <AudioLines size={14} style={{ color: accentColor }} />
        Pokédex Voice Entry
      </div>

      <p className="text-sm font-medium italic leading-relaxed text-slate-300 dark:text-slate-200 font-serif mb-5">
        "{description || "No data available."}"
      </p>

      <div className="flex items-center gap-3">
        <Button
          size="sm"
          onClick={handleSpeak}
          className="rounded-full px-6 flex items-center gap-2"
          style={{ 
            backgroundColor: isSpeaking && !isPaused ? '#f59e0b' : accentColor,
            boxShadow: `0 8px 16px ${isSpeaking && !isPaused ? '#f59e0b44' : accentColor + '44'}`
          }}
        >
          {isSpeaking && !isPaused ? <Pause size={14} /> : <Play size={14} />}
          {isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Read Entry'}
        </Button>

        {isSpeaking && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleStop}
            className="rounded-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <Square size={14} className="fill-current" />
          </Button>
        )}

        {cry && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playCry}
            className="ml-auto p-2 rounded-full bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <Volume2 size={20} />
          </motion.button>
        )}
      </div>
    </div>
  );
};
