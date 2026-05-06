import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, RefreshCw } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAIL } from './PokeDetail';

interface GameModalProps {
  onClose: () => void;
}

export default function GameModal({ onClose }: GameModalProps) {
  const [targetId, setTargetId] = useState<number | null>(null);
  const [guess, setGuess] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const { data, loading } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: targetId },
    skip: !targetId,
  });

  const generateNew = () => {
    setTargetId(Math.floor(Math.random() * 151) + 1);
    setIsRevealed(false);
    setGuess('');
    setStatus('playing');
  };

  useEffect(() => {
    generateNew();
  }, []);

  const pokemon = data?.pokemon;

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pokemon) return;
    
    if (guess.toLowerCase().trim() === pokemon.name.toLowerCase()) {
      setIsRevealed(true);
      setStatus('won');
      if (pokemon.cry) {
        const audio = new Audio(pokemon.cry);
        audio.volume = 0.5;
        audio.play().catch(e => console.error("Audio playback failed", e));
      }
    } else {
      setStatus('lost');
    }
  };

  const handleGiveUp = () => {
    setIsRevealed(true);
    setStatus('lost');
    if (pokemon?.cry) {
      const audio = new Audio(pokemon.cry);
      audio.volume = 0.5;
      audio.play().catch(e => console.error("Audio ", e));
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl rounded-[32px] overflow-hidden relative z-10 flex flex-col"
        >
          <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Play className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Who's That Pokemon?</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="p-12 flex flex-col items-center">
            {loading || !pokemon ? (
              <div className="w-64 h-64 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-slate-400 font-bold tracking-widest text-sm">LOADING...</span>
              </div>
            ) : (
              <>
                <div className="relative w-64 h-64 mb-8">
                  <div className="absolute inset-0 bg-indigo-50 dark:bg-slate-800 rounded-full animate-ping opacity-20" />
                  <img 
                    src={pokemon.image} 
                    alt="Mystery Pokemon" 
                    className={`w-full h-full object-contain relative z-10 transition-all duration-1000 ${isRevealed ? 'drop-shadow-2xl' : 'brightness-0 drop-shadow-md'}`}
                  />
                  {isRevealed && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -right-4 -top-4 bg-indigo-600 text-white font-black text-2xl uppercase tracking-tighter py-2 px-6 rounded-full shadow-xl rotate-12 z-20"
                    >
                      IT'S {pokemon.name}!
                    </motion.div>
                  )}
                </div>

                {!isRevealed ? (
                  <form onSubmit={handleGuess} className="w-full max-w-sm space-y-4">
                    <input
                      type="text"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder="Enter Pokemon name..."
                      className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 ${status === 'lost' ? 'border-red-400 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'} rounded-2xl outline-none font-bold text-center uppercase tracking-widest text-slate-900 dark:text-white transition-colors`}
                      autoFocus
                    />
                    <div className="flex gap-2">
                       <button 
                         type="submit"
                         className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest transition-colors shadow-md"
                       >
                         Guess
                       </button>
                       <button 
                         type="button"
                         onClick={handleGiveUp}
                         className="px-6 py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest transition-colors"
                       >
                         Pass
                       </button>
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center space-y-6 w-full max-w-sm"
                  >
                    <div className={`text-2xl font-black uppercase tracking-tighter ${status === 'won' ? 'text-green-500' : 'text-red-500'}`}>
                      {status === 'won' ? 'You got it right!' : 'Better luck next time!'}
                    </div>
                    <button 
                      onClick={generateNew}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg"
                    >
                      <RefreshCw className="w-5 h-5" /> Play Again
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
