import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Brain, Search, X, HelpCircle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Ability } from '../types';
import { TYPE_COLORS, capitalizeSlug } from '../lib/utils';
import { useDebounce } from '../hooks/useDebounce';
import styles from '../styles/pages/AbilityDex.module.scss';

const GET_ALL_ABILITIES = gql`
  query GetAllAbilities($gen: Int, $limit: Int, $offset: Int, $search: String) {
    getAllAbilities(gen: $gen, limit: $limit, offset: $offset, search: $search) {
      results { id name generation flavorText shortEffect effect pokemons { id name types image speciesId } }
      totalCount
    }
  }
`;

const fmt = capitalizeSlug;

export default function AbilityDex() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [genFilter, setGenFilter] = useState<number|string>('ALL');
  const [selectedAbility, setSelectedAbility] = useState<Ability|null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);


  const limit = 24;
  const queryGen = genFilter==='ALL' ? null : Number(genFilter);

  const { data, loading, error, fetchMore } = useQuery<{getAllAbilities:{results:Ability[];totalCount:number}}>( GET_ALL_ABILITIES, {
    variables: { gen:queryGen, limit, offset:0, search:debouncedSearch },
  });

  const list = data?.getAllAbilities?.results || [];
  const total = data?.getAllAbilities?.totalCount || 0;
  const hasMore = list.length > 0 && list.length < total;

  const loadMore = () => {
    fetchMore({ variables:{ offset:list.length },
      updateQuery:(prev,{fetchMoreResult})=>{
        if (!fetchMoreResult) return prev;
        return { getAllAbilities:{ ...prev.getAllAbilities, results:[...prev.getAllAbilities.results,...fetchMoreResult.getAllAbilities.results] } };
      }
    });
  };

  const genOptions = [
    {value:'ALL',label:'All Generations'},
    ...Array.from({length:7},(_,i)=>({value:i+3,label:`Generation ${i+3}`}))
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}><Brain className={styles.icon}/> Ability Dex</h1>
        <p className={styles.desc}>Explore unique battle passive traits, hidden capabilities, and strategic benefits.</p>
      </div>

      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={16}/>
        <input className={styles.searchInput} type="text" placeholder="Search abilities..."
          value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
      </div>

      <div className={styles.filterCard}>
        <div className={styles.formGroup}>
          <span className={styles.inputLabel}>Generation</span>
          <div className={styles.selectWrapper}>
            <select className={styles.selectField} value={genFilter} onChange={e=>setGenFilter(e.target.value)}>
              {genOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {!loading && !error && <span className={styles.infoLabel}>{total} Abilities{genFilter!=='ALL'?` · Gen ${genFilter}`:''}</span>}

      {error ? (
        <div style={{padding:20,borderRadius:12,background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.3)',color:'#ef4444',display:'flex',alignItems:'center',gap:12,fontWeight:700}}>
          <ShieldAlert/> Backend offline — start the server on port 3000.
        </div>
      ) : loading && list.length===0 ? (
        <div className={styles.grid}>
          {[...Array(12)].map((_,i)=><div key={i} style={{height:120,borderRadius:16,background:'rgba(255,255,255,0.03)',border:'1px solid var(--border-main)'}}/>)}
        </div>
      ) : (
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {list.map((ab,i)=>(
              <motion.div key={ab.id} className={styles.abilityCard}
                initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}
                transition={{duration:0.3,delay:Math.min(i*0.03,0.4)}}
                onClick={()=>{setSelectedAbility(ab);setDrawerOpen(true);}}>
                <div className={styles.abilityName}>{fmt(ab.name)}</div>
                <div className={styles.abilityDesc}>{ab.shortEffect||'No effect description available.'}</div>
              </motion.div>
            ))}
          </AnimatePresence>
          {!loading && list.length===0 && (
            <div style={{gridColumn:'1/-1',textAlign:'center',padding:'60px 0',color:'var(--text-muted)'}}>
              <HelpCircle size={48} style={{opacity:0.4,marginBottom:12}}/>
              <h3 style={{fontWeight:800,color:'var(--text-secondary)'}}>No Abilities found.</h3>
            </div>
          )}
        </div>
      )}

      {!loading && hasMore && (
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreBtn} onClick={loadMore}>Load More Abilities</button>
        </div>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && selectedAbility && (
          <>
            <motion.div className={styles.drawerOverlay} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDrawerOpen(false)}/>
            <motion.div className={styles.drawerSheet} initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:26,stiffness:200}}>
              <div className={styles.drawerHeader}>
                <div>
                  <div className={styles.drawerTitle}>{fmt(selectedAbility.name)}</div>
                  <div className={styles.drawerSub}>Ability</div>
                </div>
                <button className={styles.closeBtn} onClick={()=>setDrawerOpen(false)}><X size={16}/></button>
              </div>
              <div className={styles.drawerBody}>
                {selectedAbility.generation && (
                  <span className={styles.genChip}>Introduced in Generation {selectedAbility.generation}</span>
                )}
                {selectedAbility.flavorText?.trim() && (
                  <div className={styles.detailCard}>
                    <div className={styles.cardHead}>Game Description</div>
                    <div className={styles.cardContent}>{selectedAbility.flavorText}</div>
                  </div>
                )}
                {selectedAbility.shortEffect?.trim() && (
                  <div className={styles.detailCard}>
                    <div className={styles.cardHead}>Effect</div>
                    <div className={styles.cardContent}>{selectedAbility.shortEffect}</div>
                  </div>
                )}
                {selectedAbility.effect?.trim() && (
                  <div className={styles.detailCard}>
                    <div className={styles.cardHead}>In-Depth Effect</div>
                    <div className={styles.cardContent}>{selectedAbility.effect}</div>
                  </div>
                )}
                {selectedAbility.pokemons?.length > 0 && (
                  <div>
                    <div className={styles.sectionTitle}>Pokémon with this Ability ({selectedAbility.pokemons.length})</div>
                    <div className={styles.pokemonList}>
                      {selectedAbility.pokemons.map(p=>{
                        const tc = TYPE_COLORS[p.types[0]?.toLowerCase()||'normal']||'#9ca3af';
                        return (
                          <div key={p.id} className={styles.pokemonCard} style={{background:`${tc}18`}}>
                            <div className={styles.meta}>
                              <span className={styles.id}>#{String(p.id).padStart(3,'0')}</span>
                              <span className={styles.name}>{p.name}</span>
                              <div className={styles.typesRow}>
                                {p.types.map(t=><span key={t} className={styles.typeBadge} style={{background:TYPE_COLORS[t.toLowerCase()]||'#9ca3af'}}>{t}</span>)}
                              </div>
                            </div>
                            <img className={styles.sprite} src={p.image} alt={p.name}/>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
