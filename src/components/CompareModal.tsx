import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Swords } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAIL } from './PokeDetail';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CompareModalProps {
  ids: number[];
  onClose: () => void;
}

export default function CompareModal({ ids, onClose }: CompareModalProps) {
  const { data: data1 } = useQuery(GET_POKEMON_DETAIL, { variables: { id: ids[0] }, skip: !ids[0] });
  const { data: data2 } = useQuery(GET_POKEMON_DETAIL, { variables: { id: ids[1] }, skip: !ids[1] });

  if (ids.length < 2) return null;

  const p1 = data1?.pokemon;
  const p2 = data2?.pokemon;

  const getStatsData = () => {
    if (!p1 || !p2) return [];
    
    // assuming stats array has same order (hp, attack, defense, sp-atk, sp-def, speed)
    return p1.stats.map((stat: any, index: number) => {
      return {
        subject: stat.name.toUpperCase().replace('-', ' '),
        [p1.name]: stat.value,
        [p2.name]: p2.stats[index]?.value || 0,
        fullMark: 255,
      }
    });
  };

  const chartData = getStatsData();

  return (
    <AnimatePresence>
      {(p1 && p2) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-5xl bg-white dark:bg-slate-900 shadow-2xl rounded-[32px] overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
          >
            <div className="flex justify-between items-center p-8 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Swords className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Head to Head</h2>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Stat Comparison</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                
                {/* P1 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-48 h-48 bg-slate-50 dark:bg-slate-800 rounded-full p-6 shadow-inner relative">
                    <img src={p1.image} alt={p1.name} className="w-full h-full object-contain relative z-10 drop-shadow-xl" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-indigo-600 dark:text-indigo-400">{p1.name}</h3>
                  <div className="flex gap-2">
                    {p1.types.map((t: string) => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full text-white bg-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-4xl font-black text-slate-200 dark:text-slate-800 italic">#{p1.id}</div>
                </div>

                {/* Radar Chart */}
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid strokeOpacity={0.2} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 255]} tick={false} axisLine={false} />
                      <Radar name={p1.name} dataKey={p1.name} stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                      <Radar name={p2.name} dataKey={p2.name} stroke="#db2777" fill="#db2777" fillOpacity={0.5} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* P2 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-48 h-48 bg-slate-50 dark:bg-slate-800 rounded-full p-6 shadow-inner relative">
                    <img src={p2.image} alt={p2.name} className="w-full h-full object-contain relative z-10 drop-shadow-xl" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-pink-600 dark:text-pink-400">{p2.name}</h3>
                  <div className="flex gap-2">
                    {p2.types.map((t: string) => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full text-white bg-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-4xl font-black text-slate-200 dark:text-slate-800 italic">#{p2.id}</div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
