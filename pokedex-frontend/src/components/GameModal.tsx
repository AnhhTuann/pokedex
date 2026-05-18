import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, Trophy, Frown } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAIL } from './PokeDetail';
import styles from '../styles/components/GameModal.module.scss';

interface GameModalProps { onClose: () => void; }

export default function GameModal({ onClose }: GameModalProps) {
  const [targetId, setTargetId] = useState<number | null>(null);
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [wrongAnim, setWrongAnim] = useState(false);

  const { data, loading } = useQuery(GET_POKEMON_DETAIL, { variables: { id: targetId }, skip: !targetId });
  const pokemon = data?.pokemon;

  const newRound = () => {
    setTargetId(Math.floor(Math.random() * 151) + 1);
    setGuess(''); setRevealed(false); setStatus('playing');
  };

  useEffect(() => { newRound(); }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pokemon) return;
    if (guess.toLowerCase().trim() === pokemon.name.toLowerCase()) {
      setRevealed(true); setStatus('won');
    } else {
      setStatus('lost');
      setWrongAnim(true);
      setTimeout(() => setWrongAnim(false), 500);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className={styles.overlay}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 200 }}
          onClick={e => e.stopPropagation()}
          className={styles.modalCard}
        >
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.title}>🎮 Who's That Pokémon?</span>
            <button onClick={onClose} className={styles.closeBtn}>
              <X size={16}/>
            </button>
          </div>

          {/* Body */}
          <div className={styles.body}>
            {/* Silhouette Circle */}
            <div className={styles.silhouetteCircle}>
              {loading || !pokemon ? (
                <div style={{ width: 40, height: 40, border: '3px solid #6366f1', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
              ) : (
                <img src={pokemon.image} alt="???"
                  className={styles.pokemonImage}
                  style={{ filter: revealed ? 'drop-shadow(0 8px 24px rgba(99,102,241,0.4))' : 'brightness(0)' }}
                />
              )}
              {revealed && pokemon && (
                <motion.div initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 10 }}
                  className={styles.revealedTag}>
                  {pokemon.name}!
                </motion.div>
              )}
            </div>

            {/* Input / Result */}
            {!revealed ? (
              <form onSubmit={handleGuess} className={styles.form}>
                <motion.input
                  animate={wrongAnim ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  value={guess}
                  onChange={e => setGuess(e.target.value)}
                  placeholder="Enter Pokémon name…"
                  autoFocus
                  className={styles.input}
                  style={{ border: `1px solid ${status === 'lost' ? '#ef4444' : 'var(--border-main)'}` }}
                />
                {status === 'lost' && <span className={styles.errorText}>Wrong! Try again.</span>}
                <div className={styles.btnRow}>
                  <button type="submit" className={styles.submitBtn}>
                    Guess!
                  </button>
                  <button type="button" onClick={() => { setRevealed(true); setStatus('lost'); }}
                    className={styles.giveUpBtn}>
                    Give Up
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.resultContainer}>
                {status === 'won' ? (
                  <>
                    <Trophy size={48} color="#eab308"/>
                    <span className={styles.winnerTitle}>You got it!</span>
                  </>
                ) : (
                  <>
                    <Frown size={48} color="var(--text-muted)"/>
                    <span className={styles.loserTitle}>Better luck next time!</span>
                    <span className={styles.correctAnswer}>It was: {pokemon?.name}</span>
                  </>
                )}
                <button onClick={newRound} className={styles.playAgainBtn}>
                  <RefreshCw size={16}/> Play Again
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
