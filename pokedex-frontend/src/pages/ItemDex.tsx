import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ShoppingBag, Search, X, HelpCircle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Item } from '../types';
import styles from '../styles/pages/ItemDex.module.scss';

const GET_ALL_ITEMS = gql`
  query GetAllItems($search: String, $limit: Int, $offset: Int) {
    getAllItems(search: $search, limit: $limit, offset: $offset) {
      results { id name cost flingPower flingEffect category pocket flavorText effect spriteUrl }
      totalCount
    }
  }
`;

const fmt = (name: string) => name.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
const disp = (v: any) => (v===null||v===undefined||v===0||v==='') ? '-' : v;

export default function ItemDex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item|null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(()=>setDebouncedSearch(searchTerm),500);
    return ()=>clearTimeout(t);
  }, [searchTerm]);

  const limit = 30;
  const { data, loading, error, fetchMore } = useQuery<{getAllItems:{results:Item[];totalCount:number}}>(GET_ALL_ITEMS, {
    variables: { search:debouncedSearch, limit, offset:0 },
  });

  const list = data?.getAllItems?.results || [];
  const total = data?.getAllItems?.totalCount || 0;
  const hasMore = list.length > 0 && list.length < total;

  const loadMore = () => {
    fetchMore({ variables:{ offset:list.length },
      updateQuery:(prev,{fetchMoreResult})=>{
        if (!fetchMoreResult) return prev;
        return { getAllItems:{ ...prev.getAllItems, results:[...prev.getAllItems.results,...fetchMoreResult.getAllItems.results] } };
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}><ShoppingBag/> Item Dex</h1>
        <p className={styles.desc}>Explore key objects, healing potions, held battle equipment, and bag categories.</p>
      </div>

      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={16}/>
        <input className={styles.searchInput} type="text" placeholder="Search items..."
          value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
      </div>

      {!loading && !error && <span className={styles.infoLabel}>{total} Items found</span>}

      {error ? (
        <div style={{padding:20,borderRadius:12,background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.3)',color:'#ef4444',display:'flex',alignItems:'center',gap:12,fontWeight:700}}>
          <ShieldAlert/> Backend offline — start the server on port 3000.
        </div>
      ) : loading && list.length===0 ? (
        <div className={styles.grid}>
          {[...Array(12)].map((_,i)=><div key={i} style={{height:90,borderRadius:16,background:'rgba(255,255,255,0.03)',border:'1px solid var(--border-main)'}}/>)}
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {list.map((item,i)=>(
                <motion.div key={item.id} className={styles.itemCard}
                  initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}
                  transition={{duration:0.3,delay:Math.min(i*0.02,0.3)}}
                  onClick={()=>{setSelectedItem(item);setDrawerOpen(true);}}>
                  {item.spriteUrl
                    ? <img className={styles.itemSprite} src={item.spriteUrl} alt={item.name}/>
                    : <div className={styles.itemPlaceholder}><ShoppingBag size={20}/></div>}
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{fmt(item.name)}</div>
                    <div className={styles.itemDesc}>{item.flavorText?.trim() || 'Data unavailable for this version.'}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {!loading && list.length===0 && (
              <div style={{gridColumn:'1/-1',textAlign:'center',padding:'60px 0',color:'var(--text-muted)'}}>
                <HelpCircle size={48} style={{opacity:0.4,marginBottom:12}}/>
                <h3 style={{fontWeight:800,color:'var(--text-secondary)'}}>No Items found.</h3>
                <p style={{fontSize:13,fontWeight:600,marginTop:4}}>Try typing a different name.</p>
              </div>
            )}
          </div>
          {!loading && hasMore && (
            <div className={styles.loadMoreContainer}>
              <button className={styles.loadMoreBtn} onClick={loadMore}>Load More Items</button>
            </div>
          )}
        </>
      )}

      {/* Detail Drawer */}
      <AnimatePresence>
        {drawerOpen && selectedItem && (
          <>
            <motion.div className={styles.drawerOverlay} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDrawerOpen(false)}/>
            <motion.div className={styles.drawerSheet} initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:26,stiffness:200}}>
              <div className={styles.drawerHeader}>
                <div>
                  <div className={styles.drawerTitle}>{fmt(selectedItem.name)}</div>
                  <div className={styles.drawerSub}>Item</div>
                </div>
                <button className={styles.closeBtn} onClick={()=>setDrawerOpen(false)}><X size={16}/></button>
              </div>
              <div className={styles.drawerBody}>
                {selectedItem.spriteUrl && (
                  <div className={styles.spriteBlock}>
                    <img src={selectedItem.spriteUrl} alt={selectedItem.name}/>
                  </div>
                )}

                {/* Specs */}
                <div className={styles.specsGrid}>
                  <div className={styles.specTile}>
                    <span className={styles.specLabel}>Category</span>
                    <span className={styles.specValue}>{disp(selectedItem.category?.replace(/-/g,' '))}</span>
                  </div>
                  <div className={styles.specTile}>
                    <span className={styles.specLabel}>Bag Pocket</span>
                    <span className={styles.specValue}>{disp(selectedItem.pocket?.replace(/-/g,' '))}</span>
                  </div>
                </div>

                <div className={`${styles.specsGrid} ${styles.threeCol}`}>
                  <div className={styles.specTile}>
                    <span className={styles.specLabel}>Cost</span>
                    <span className={styles.specValue}>{selectedItem.cost ? `${selectedItem.cost} ¥` : '-'}</span>
                  </div>
                  <div className={styles.specTile}>
                    <span className={styles.specLabel}>Fling Pwr</span>
                    <span className={styles.specValue}>{disp(selectedItem.flingPower)}</span>
                  </div>
                  <div className={styles.specTile}>
                    <span className={styles.specLabel}>Fling FX</span>
                    <span className={styles.specValue}>{disp(selectedItem.flingEffect?.replace(/-/g,' '))}</span>
                  </div>
                </div>

                {selectedItem.flavorText?.trim() && (
                  <div className={styles.detailCard}>
                    <div className={styles.cardHead}>Game Description</div>
                    <div className={styles.cardContent}>{selectedItem.flavorText}</div>
                  </div>
                )}
                {selectedItem.effect?.trim() && (
                  <div className={styles.detailCard}>
                    <div className={styles.cardHead}>Effect</div>
                    <div className={styles.cardContent}>{selectedItem.effect}</div>
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
