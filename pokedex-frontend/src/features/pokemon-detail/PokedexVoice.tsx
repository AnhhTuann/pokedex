import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Play, Pause, Square, AudioLines, Volume2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import styles from '../../styles/features/PokemonDetailDialog.module.scss';

interface PokedexVoiceProps {
  description: string;
  accentColor: string;
  cry?: string | null;
}

export const PokedexVoice: React.FC<PokedexVoiceProps> = ({ description, accentColor, cry }) => {
  const reduceMotion = useReducedMotion();
  const speechSupported = typeof window.speechSynthesis !== 'undefined';
  const [speech, setSpeech] = useState<'idle' | 'starting' | 'speaking' | 'paused'>('idle');
  const [speechError, setSpeechError] = useState(false);
  const [cryError, setCryError] = useState(false);
  const [cryActive, setCryActive] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isSpeaking = speech === 'speaking' || speech === 'paused';
  const isPaused = speech === 'paused';

  function stopSpeech() {
    const utterance = utteranceRef.current;
    if (!utterance) return;
    utteranceRef.current = null;
    utterance.onstart = utterance.onend = utterance.onerror = null;
    window.speechSynthesis.cancel();
  }

  function releaseCry() {
    const audio = audioRef.current;
    if (!audio) return;
    audioRef.current = null;
    audio.onended = audio.onerror = null;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
  }

  useEffect(() => {
    setSpeech('idle');
    setSpeechError(false);
    return stopSpeech;
  }, [description]);

  useEffect(() => {
    setCryActive(false);
    setCryError(false);
    return releaseCry;
  }, [cry]);

  const handleSpeak = () => {
    if (!description || !speechSupported || speech === 'starting') return;
    const synth = window.speechSynthesis;
    if (isPaused) {
      synth.resume();
      setSpeech('speaking');
      return;
    }
    if (isSpeaking) {
      synth.pause();
      setSpeech('paused');
      return;
    }

    setSpeechError(false);
    const utterance = new SpeechSynthesisUtterance(description);
    utterance.lang = 'en-US';
    const englishVoices = synth.getVoices().filter(voice => /^en(?:-|$)/i.test(voice.lang));
    const voice = englishVoices.find(voice => /google uk english female/i.test(voice.name))
      ?? englishVoices.find(voice => /google us english|zira/i.test(voice.name))
      ?? englishVoices[0];
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utteranceRef.current = utterance;
    const finish = (failed: boolean) => {
      if (utteranceRef.current !== utterance) return;
      utteranceRef.current = null;
      setSpeech('idle');
      setSpeechError(failed);
    };
    utterance.onstart = () => {
      if (utteranceRef.current === utterance) setSpeech('speaking');
    };
    utterance.onend = () => finish(false);
    utterance.onerror = () => finish(true);
    setSpeech('starting');
    try {
      synth.speak(utterance);
    } catch {
      finish(true);
    }
  };

  const handleStop = () => {
    stopSpeech();
    setSpeech('idle');
  };

  const playCry = async () => {
    if (!cry || audioRef.current) return;
    setCryError(false);
    const audio = new Audio(cry);
    audioRef.current = audio;
    const finish = (failed: boolean) => {
      if (audioRef.current !== audio) return;
      releaseCry();
      setCryActive(false);
      setCryError(failed);
    };
    audio.volume = 0.5;
    audio.onended = () => finish(false);
    audio.onerror = () => finish(true);
    setCryActive(true);
    try {
      await audio.play();
    } catch {
      finish(true);
    }
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
                animate={{ height: reduceMotion ? 8 : [4, 20, 8, 24, 6] }}
                transition={{ duration: 1, repeat: reduceMotion ? 0 : Infinity, delay: i * 0.1, ease: "easeInOut" }}
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
          disabled={!description || !speechSupported || speech === 'starting'}
          className={styles.speakBtn}
          style={{ 
            background: isSpeaking && !isPaused ? '#f0bd67' : `color-mix(in srgb, ${accentColor} 27%, var(--bg-paper))`,
            color: isSpeaking && !isPaused ? '#242123' : 'var(--text-primary)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {isSpeaking && !isPaused ? <Pause size={14} /> : <Play size={14} />}
          {speech === 'starting' ? 'Starting…' : isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Read Entry'}
        </Button>

        {speech !== 'idle' && (
          <button
            onClick={handleStop} aria-label="Stop reading"
            className={styles.stopBtn}
          >
            <Square size={14} className="fill-current" />
          </button>
        )}

        {cry && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playCry} disabled={cryActive} aria-label="Play Pokémon cry"
            className={styles.cryBtn}
            style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 16%, var(--bg-paper))` }}
          >
            <Volume2 size={20} />
          </motion.button>
        )}
      </div>
      {speechError && <p role="status">Unable to read this entry aloud.</p>}
      {cryError && <p role="status">Unable to play this Pokémon’s cry.</p>}
    </div>
  );
};
