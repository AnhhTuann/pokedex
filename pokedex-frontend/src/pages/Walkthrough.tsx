import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, ChevronLeft, Settings, Loader } from 'lucide-react';
import { VERSION_COLORS } from '../App';
import styles from '../styles/pages/Walkthrough.module.scss';

const GET_WALKTHROUGHS = gql`
  query GetWalkthroughs($gameVersion: String!, $language: String!) {
    getWalkthroughs(gameVersion: $gameVersion, language: $language) {
      id gameVersion chapterTitle description coverImage content order language
    }
  }
`;

const GAME_OPTIONS = [
  { value:'red',label:'Red' },{ value:'blue',label:'Blue' },{ value:'yellow',label:'Yellow' },
  { value:'gold',label:'Gold' },{ value:'silver',label:'Silver' },{ value:'crystal',label:'Crystal' },
  { value:'ruby',label:'Ruby' },{ value:'sapphire',label:'Sapphire' },{ value:'emerald',label:'Emerald' },
  { value:'firered',label:'FireRed' },{ value:'leafgreen',label:'LeafGreen' },
  { value:'diamond',label:'Diamond' },{ value:'pearl',label:'Pearl' },{ value:'platinum',label:'Platinum' },
  { value:'heartgold',label:'HeartGold' },{ value:'soulsilver',label:'SoulSilver' },
  { value:'black',label:'Black' },{ value:'white',label:'White' },
  { value:'black-2',label:'Black 2' },{ value:'white-2',label:'White 2' },
  { value:'x',label:'X' },{ value:'y',label:'Y' },
  { value:'omega-ruby',label:'Omega Ruby' },{ value:'alpha-sapphire',label:'Alpha Sapphire' },
  { value:'sun',label:'Sun' },{ value:'moon',label:'Moon' },
  { value:'ultra-sun',label:'Ultra Sun' },{ value:'ultra-moon',label:'Ultra Moon' },
  { value:'lets-go-pikachu',label:"Let's Go Pikachu" },{ value:'lets-go-eevee',label:"Let's Go Eevee" },
  { value:'sword',label:'Sword' },{ value:'shield',label:'Shield' },
  { value:'brilliant-diamond',label:'Brilliant Diamond' },{ value:'shining-pearl',label:'Shining Pearl' },
  { value:'legends-arceus',label:'Legends: Arceus' },
  { value:'scarlet',label:'Scarlet' },{ value:'violet',label:'Violet' },
  { value:'legends-za',label:'Legends: Z-A' },
];

export default function Walkthrough() {
  const navigate = useNavigate();
  const [gameVersion, setGameVersion] = useState('emerald');
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);

  const { data, loading } = useQuery(GET_WALKTHROUGHS, { variables: { gameVersion, language } });
  const chapters = data?.getWalkthroughs || [];

  useEffect(() => {
    if (chapters.length > 0) setSelectedChapterId(chapters[0].id);
    else setSelectedChapterId(null);
  }, [data]);

  const activeChapter = chapters.find((c: any) => c.id === selectedChapterId);
  const cleanHTML = activeChapter ? DOMPurify.sanitize(activeChapter.content) : '';
  const gameColor = VERSION_COLORS[gameVersion] || '#6366f1';

  let toc: { id: string; text: string; level: number }[] = [];
  let processedHTML = cleanHTML;
  if (activeChapter) {
    let index = 0;
    processedHTML = cleanHTML.replace(/<(h[23])>(.*?)<\/\1>/gi, (_, tag, inner) => {
      const id = `toc-heading-${index++}`;
      toc.push({ id, text: inner.replace(/<[^>]+>/g, ''), level: parseInt(tag[1]) });
      return `<${tag} id="${id}">${inner}</${tag}>`;
    });
  }

  const activeIndex = chapters.findIndex((c: any) => c.id === selectedChapterId);
  const prevChapter = activeIndex > 0 ? chapters[activeIndex - 1] : null;
  const nextChapter = activeIndex >= 0 && activeIndex < chapters.length - 1 ? chapters[activeIndex + 1] : null;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' });

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            <BookOpen size={32}/> Game Walkthroughs
          </h1>
          <p className={styles.desc}>Khám phá cẩm nang và hướng dẫn vượt ải Pokémon toàn diện.</p>
        </div>
        <div className={styles.headerActions}>
          {/* Language Toggle */}
          <div className={styles.langToggle}>
            {(['vi','en'] as const).map(l => (
              <button key={l} onClick={() => setLanguage(l)}
                className={`${styles.langBtn} ${language === l ? styles.active : ''}`}>
                {l==='vi'?'🇻🇳 VI':'🇬🇧 EN'}
              </button>
            ))}
          </div>
          <button onClick={() => navigate('/admin/walkthrough')} className={styles.cmsBtn}>
            <Settings size={15}/> CMS Editor 🛠️
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div style={{ padding:'20px 20px 16px' }}>
            <span className={styles.panelTitle}>Select Version</span>
            <div className={styles.selectWrapper}>
              <span className={styles.selectColorBadge} style={{ background:gameColor, boxShadow:`0 0 10px ${gameColor}` }}/>
              <select value={gameVersion} onChange={e => setGameVersion(e.target.value)} className={styles.selectField}>
                {GAME_OPTIONS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ height:1,background:'var(--border-main)',margin:'0 20px' }}/>

          <div style={{ padding:'16px 20px 4px' }}>
            <span className={styles.panelTitle}>Chapters List</span>
          </div>

          {loading ? (
            <div style={{ padding:'40px 20px',display:'flex',justifyContent:'center' }}>
              <Loader size={28} color={gameColor} style={{ animation:'spin 0.8s linear infinite' }}/>
            </div>
          ) : chapters.length === 0 ? (
            <div style={{ padding:'40px 20px',textAlign:'center',opacity:0.5 }}>
              <BookOpen size={36} style={{ marginBottom:8,opacity:0.5,color:'var(--text-secondary)' }}/>
              <p style={{ fontSize:13,fontWeight:700,color:'var(--text-secondary)',margin:0 }}>No chapters found</p>
              <p style={{ fontSize:11,color:'var(--text-muted)',marginTop:4 }}>Chưa có nội dung cho bản game này.</p>
            </div>
          ) : (
            <div className={styles.chaptersList}>
              {chapters.map((ch: any) => {
                const isActive = selectedChapterId === ch.id;
                return (
                  <button key={ch.id} onClick={() => setSelectedChapterId(ch.id)}
                    className={`${styles.chapterBtn} ${isActive ? styles.active : ''}`}
                    style={{ 
                      border: isActive ? `1px solid ${gameColor}55` : 'transparent', 
                      background: isActive ? `${gameColor}1a` : 'transparent',
                      color: isActive ? gameColor : undefined
                    }}>
                    {isActive && <span className={styles.chapterIndicator} style={{ background:gameColor }}/>}
                    <span className={styles.chapterText}>{ch.chapterTitle}</span>
                    <ChevronRight size={14} className={styles.chapterIcon}/>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <div style={{ padding:'32px 40px' }}>
            {activeChapter ? (
              <div>
                {/* Cover Image */}
                {activeChapter.coverImage && (
                  <div className={styles.coverImageWrapper}>
                    <img src={activeChapter.coverImage} className={styles.coverImage}/>
                    <div className={styles.coverGradient}/>
                  </div>
                )}

                {/* Chapter Header */}
                <div className={styles.chapterMeta}>
                  <span className={styles.orderBadge} style={{ background:`${gameColor}33`, border:`1px solid ${gameColor}66`, color:gameColor }}>
                    Chapter {activeChapter.order}
                  </span>
                  <h2 className={styles.chapterTitle}>{activeChapter.chapterTitle}</h2>
                </div>

                {activeChapter.description && (
                  <p className={styles.chapterDesc} style={{ borderLeft:`4px solid ${gameColor}` }}>
                    {activeChapter.description}
                  </p>
                )}

                {/* TOC */}
                {toc.length > 0 && (
                  <div className={styles.toc} style={{ background:`${gameColor}0d`, border:`1px solid ${gameColor}26` }}>
                    <span className={styles.tocTitle} style={{ color:gameColor }}>Nội dung chính</span>
                    <div className={styles.tocList}>
                      {toc.map(item => (
                        <div key={item.id} onClick={() => scrollTo(item.id)}
                          className={`${styles.tocItem} ${item.level === 3 ? styles.level3 : ''}`}
                          onMouseEnter={e => { (e.target as HTMLElement).style.color=gameColor; }}
                          onMouseLeave={e => { (e.target as HTMLElement).style.color='var(--text-secondary)'; }}>
                          • {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.contentDivider}/>

                {/* Content */}
                <div className="walkthrough-content" dangerouslySetInnerHTML={{ __html: processedHTML }}
                  style={{ fontFamily:'"Be Vietnam Pro","Inter",sans-serif',color:'var(--text-primary)',lineHeight:1.8 }}
                />

                {/* Footer Nav */}
                <div className={styles.contentDivider} style={{ margin:'40px 0 24px' }}/>
                <div className={styles.footerNav}>
                  {prevChapter ? (
                    <button onClick={() => setSelectedChapterId(prevChapter.id)}
                      className={`${styles.navBtn} ${styles.left}`}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=`${gameColor}1a`; (e.currentTarget as HTMLElement).style.color=gameColor; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='var(--text-secondary)'; }}>
                      <ChevronLeft size={18}/>
                      <div>
                        <span className={styles.navBtnSub}>Chương trước</span>
                        <span className={styles.navBtnTitle}>{prevChapter.chapterTitle}</span>
                      </div>
                    </button>
                  ) : <div/>}
                  {nextChapter ? (
                    <button onClick={() => setSelectedChapterId(nextChapter.id)}
                      className={`${styles.navBtn} ${styles.right}`}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=`${gameColor}1a`; (e.currentTarget as HTMLElement).style.color=gameColor; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='var(--text-secondary)'; }}>
                      <div>
                        <span className={styles.navBtnSub}>Chương tiếp</span>
                        <span className={styles.navBtnTitle}>{nextChapter.chapterTitle}</span>
                      </div>
                      <ChevronRight size={18}/>
                    </button>
                  ) : <div/>}
                </div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <BookOpen size={64} style={{ marginBottom:16,color:'var(--text-secondary)' }}/>
                <h3 className={styles.emptyStateTitle}>Vui lòng chọn chương</h3>
                <p className={styles.emptyStateText}>Chọn một chương hướng dẫn ở danh sách bên trái.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Walkthrough content CSS styles */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .walkthrough-content h1 { display:none!important; }
        .walkthrough-content h2 { color:${gameColor};font-size:1.5rem;font-weight:800;margin-top:2.5rem;margin-bottom:1rem;border-bottom:1px solid var(--border-main);padding-bottom:0.5rem; }
        .walkthrough-content h3 { font-size:1.15rem;font-weight:700;margin-top:2rem;margin-bottom:0.75rem;color:var(--text-primary); }
        .walkthrough-content p { font-size:1rem;line-height:1.8;color:var(--text-primary);margin-bottom:1.25rem;opacity:0.9; }
        .walkthrough-content strong { color:var(--text-primary);font-weight:700; }
        .walkthrough-content ul,.walkthrough-content ol { margin-bottom:1.25rem;padding-left:1.5rem;color:var(--text-secondary);line-height:1.8; }
        .walkthrough-content li { margin-bottom:0.25rem; }
        .walkthrough-content table { width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:0.95rem;border-radius:12px;overflow:hidden;box-shadow:var(--shadow-md);border:1px solid var(--border-main);background:var(--bg-paper-glow); }
        .walkthrough-content th { background:${gameColor}14;color:var(--text-primary);font-weight:800;padding:14px 18px;text-align:left;text-transform:uppercase;font-size:0.82rem;letter-spacing:0.5px;border-bottom:2px solid ${gameColor}4d; }
        .walkthrough-content td { padding:14px 18px;border-bottom:1px solid var(--border-main);color:var(--text-secondary);vertical-align:middle; }
        .walkthrough-content tbody tr:hover { background:rgba(var(--primary-rgb), 0.04); }
        .walkthrough-content img { max-width:64px;display:inline-block;vertical-align:middle;margin:0 4px;transition:transform 0.2s,filter 0.2s;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.15)); }
        .walkthrough-content img:hover { transform:scale(1.2) translateY(-2px);filter:drop-shadow(0 8px 12px ${gameColor}66); }
        .walkthrough-content blockquote { border-left:4px solid ${gameColor};padding:12px 20px;margin:20px 0;background:${gameColor}0d;border-radius:0 8px 8px 0;color:var(--text-secondary);font-style:italic; }
      `}</style>
    </div>
  );
}
