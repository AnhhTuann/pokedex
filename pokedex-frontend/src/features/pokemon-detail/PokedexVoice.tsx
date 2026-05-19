import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Square, AudioLines, Volume2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import styles from '../../styles/features/PokemonDetailDialog.module.scss';

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
    <div className={styles.voiceContainer}>
      {/* Soundwave animation */}
      <AnimatePresence>
        {isSpeaking && !isPaused && (
          <div className={styles.soundwaves}>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 20, 8, 24, 6] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                className={styles.soundwaveBar}
                style={{ backgroundColor: accentColor }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className={styles.voiceLabel}>
        <AudioLines size={14} style={{ color: accentColor }} />
        Pokédex Voice Entry
      </div>

      <p className={styles.voiceDescription}>
        "{description || "No data available."}"
      </p>

      <div className={styles.voiceActions}>
        <Button
          size="sm"
          onClick={handleSpeak}
          className={styles.speakBtn}
          style={{ 
            backgroundColor: isSpeaking && !isPaused ? '#f59e0b' : accentColor,
            boxShadow: `0 8px 16px ${isSpeaking && !isPaused ? '#f59e0b44' : accentColor + '44'}`
          }}
        >
          {isSpeaking && !isPaused ? <Pause size={14} /> : <Play size={14} />}
          {isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Read Entry'}
        </Button>

        {isSpeaking && (
          <button
            onClick={handleStop}
            className={styles.stopBtn}
          >
            <Square size={14} className="fill-current" />
          </button>
        )}

        {cry && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playCry}
            className={styles.cryBtn}
          >
            <Volume2 size={20} />
          </motion.button>
        )}
      </div>
    </div>
  );
};
