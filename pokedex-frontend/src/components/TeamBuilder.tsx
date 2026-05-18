import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Zap, Shield, Brain, Star, Upload, Download, Copy, HelpCircle, AlertTriangle, CheckCircle, ChevronDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useTeamStore, TeamMember } from '../lib/teamStore';
import { TYPE_LIST, calculateDamageTaken } from '../utils/typeMatchups';
import styles from './TeamBuilder.module.scss';

const GET_POKEMON_FOR_TEAM = gql`
  query GetPokemonForTeam($search: String) {
    pokemonList(limit: 50, search: $search) {
      results { id name types image shinyImage }
    }
  }
`;

const GET_POKEMON_BUILDER_DETAILS = gql`
  query GetPokemonBuilderDetails($id: Int!) {
    pokemon(id: $id) {
      id name types image abilities
      stats { name value }
      moves { name type power accuracy damageClass }
    }
  }
`;

const TYPE_COLORS: Record<string, string> = {
  normal:'#9ca3af',fire:'#f97316',water:'#3b82f6',electric:'#eab308',
  grass:'#22c55e',ice:'#06b6d4',fighting:'#ef4444',poison:'#a855f7',
  ground:'#d97706',flying:'#818cf8',psychic:'#ec4899',bug:'#84cc16',
  rock:'#78716c',ghost:'#7c3aed',dragon:'#1d4ed8',dark:'#374151',
  steel:'#6b7280',fairy:'#f472b6',
};

const COMPETITIVE_ITEMS = [
  'Leftovers','Life Orb','Choice Band','Choice Specs','Choice Scarf',
  'Focus Sash','Assault Vest','Heavy-Duty Boots','Rocky Helmet','Eviolite',
  'Black Sludge','Air Balloon','Weakness Policy','Expert Belt','Lum Berry',
  'Sitrus Berry','Light Ball','Thick Club',
];

const NATURE_NAMES = [
  'Hardy','Lonely','Brave','Adamant','Naughty','Bold','Docile','Relaxed','Impish','Lax',
  'Timid','Hasty','Serious','Jolly','Naive','Modest','Mild','Quiet','Bashful','Rash',
  'Calm','Gentle','Sassy','Careful','Quirky',
];

function getOptimalMoves(allMoves: any[], types: string[]) {
  if (!allMoves?.length) return [];
  const dmg = allMoves.filter(m => m.damageClass==='physical'||m.damageClass==='special');
  const stab = dmg.filter(m => types.map(t=>t.toLowerCase()).includes(m.type.toLowerCase()));
  const sorted = [...stab].filter(m=>m.power&&(m.accuracy===null||m.accuracy>=90)).sort((a,b)=>(b.power||0)-(a.power||0));
  const sel: any[] = [];
  if (sorted[0]) sel.push(sorted[0]);
  if (sorted[1]) sel.push(sorted[1]);
  const cov = dmg.filter(m=>!types.map(t=>t.toLowerCase()).includes(m.type.toLowerCase()));
  const sortedCov = [...cov].filter(m=>m.power&&(m.accuracy===null||m.accuracy>=90)).sort((a,b)=>(b.power||0)-(a.power||0));
  for (const m of sortedCov) { if (sel.length>=3) break; if (!sel.some(s=>s.name===m.name)) sel.push(m); }
  const popularStatus=['protect','swords-dance','will-o-wisp','toxic','thunder-wave','substitute','nasty-plot','calm-mind','roost','recover','dragon-dance','trick-room'];
  const status = [...allMoves.filter(m=>m.damageClass==='status')].sort((a,b)=>(popularStatus.includes(b.name)?1:0)-(popularStatus.includes(a.name)?1:0));
  if (status[0] && sel.length<4) sel.push(status[0]);
  if (sel.length<4) { for (const m of [...allMoves].sort((a,b)=>(b.power||0)-(a.power||0))) { if (sel.length>=4) break; if (!sel.some(s=>s.name===m.name)) sel.push(m); } }
  return sel;
}

function getRecommendedItems(member: TeamMember): string[] {
  const name = member.name.toLowerCase();
  if (name==='pikachu') return ['Light Ball','Life Orb','Focus Sash','Leftovers'];
  if (name==='cubone'||name==='marowak') return ['Thick Club','Leftovers','Assault Vest','Life Orb'];
  if (name==='ditto') return ['Choice Scarf','Focus Sash','Leftovers'];
  const sm: Record<string,number>={};
  member.stats?.forEach((s:any)=>{ sm[s.name.toLowerCase()]=s.value; });
  const hp=sm['hp']||70,atk=sm['attack']||70,def=sm['defense']||70,spa=sm['special-attack']||70,spd=sm['special-defense']||70,spe=sm['speed']||70;
  if (hp+def+spd>250) return ['Leftovers','Rocky Helmet','Sitrus Berry','Assault Vest','Heavy-Duty Boots'];
  if (spe>100&&atk>100) return ['Choice Band','Life Orb','Choice Scarf','Expert Belt','Focus Sash'];
  if (spe>100&&spa>100) return ['Choice Specs','Life Orb','Focus Sash','Expert Belt','Choice Scarf'];
  if (spe<50&&(atk>90||spa>90)) return ['Assault Vest','Weakness Policy','Leftovers','Life Orb','Sitrus Berry'];
  return ['Leftovers','Life Orb','Focus Sash','Heavy-Duty Boots','Expert Belt'];
}

function getRecommendedAbilities(member: TeamMember): string[] {
  const abilities = member.allAbilities || [];
  if (!abilities.length) return [];
  const top=['swift-swim','chlorophyll','speed-boost','huge-power','pure-power','guts','sheer-force','adaptability','tough-claws','moxie','beast-boost','libero','protean','technician','tinted-lens','intimidate','regenerator','magic-bounce','prankster','multiscale','levitate','poison-heal','sturdy','natural-cure','disguise','mold-breaker'];
  const rec = abilities.filter((ab: string) => top.includes(ab.toLowerCase()));
  return rec.length ? rec : [abilities[0]];
}

function getRecommendedNatures(member: TeamMember): string[] {
  const sm: Record<string,number>={};
  member.stats?.forEach((s:any)=>{ sm[s.name.toLowerCase()]=s.value; });
  const hp=sm['hp']||70,atk=sm['attack']||70,def=sm['defense']||70,spa=sm['special-attack']||70,spd=sm['special-defense']||70,spe=sm['speed']||70;
  if (hp+def+spd>220&&spe<75) return ['Bold','Impish','Calm','Careful'];
  if (atk>spa&&spe>=75) return ['Jolly','Adamant'];
  if (spa>atk&&spe>=75) return ['Timid','Modest'];
  if (atk>spa) return ['Adamant','Jolly','Impish','Careful'];
  if (spa>atk) return ['Modest','Timid','Bold','Calm'];
  return ['Jolly','Timid','Adamant','Modest'];
}

function MemberSlot({ member, index }: { member: TeamMember; index: number }) {
  const { removeMember, setMoves, setAbility, setItem, setNature, updateMemberDetails } = useTeamStore();
  const { data } = useQuery(GET_POKEMON_BUILDER_DETAILS, {
    variables: { id: member.id },
    skip: !!member.allMoves,
    onCompleted: (res) => {
      if (res?.pokemon) updateMemberDetails(member.id, { allAbilities: res.pokemon.abilities, allMoves: res.pokemon.moves, stats: res.pokemon.stats });
    }
  });
  const allAbilities: string[] = member.allAbilities || data?.pokemon?.abilities || [];
  const allMoves: any[] = member.allMoves || data?.pokemon?.moves || [];
  const typeColor = TYPE_COLORS[member.types[0]] || '#6366f1';

  const handleAutoFill = () => {
    const moves = getOptimalMoves(allMoves, member.types);
    setMoves(member.id, moves);
    const items = getRecommendedItems(member); if (items[0]) setItem(member.id, items[0]);
    const abs = getRecommendedAbilities(member); if (abs[0]) setAbility(member.id, abs[0]);
    const nats = getRecommendedNatures(member); if (nats[0]) setNature(member.id, nats[0]);
  };

  const recAbilities = getRecommendedAbilities(member);
  const recItems = getRecommendedItems(member);
  const recNatures = getRecommendedNatures(member);

  return (
    <div className={styles.memberCard}>
      <button className={styles.removeBtn} onClick={() => removeMember(member.id)}><X size={12}/></button>
      <div className={styles.memberHeader}>
        <div className={styles.avatarWrap} style={{ background: `${typeColor}22` }}>
          <img src={member.image} alt={member.name}/>
        </div>
        <div className={styles.memberMeta}>
          <span className={styles.slotNum}>SLOT #{index+1}</span>
          <div className={styles.memberName}>{member.name}</div>
          <div className={styles.typesRow}>
            {member.types.map(t=>(
              <span key={t} className={styles.typeBadge} style={{background: TYPE_COLORS[t]||'#6b7280'}}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.buildForm}>
        {/* Ability */}
        <div className={styles.formRow}>
          <Star size={16} className={styles.formIcon}/>
          <select className={styles.selectField} value={member.selectedAbility||''} onChange={e=>setAbility(member.id,e.target.value||null)}>
            <option value="">— Ability —</option>
            {recAbilities.length>0&&<optgroup label="⭐ Recommended">{recAbilities.map((a:string)=><option key={a} value={a}>{a.replace(/-/g,' ')}</option>)}</optgroup>}
            <optgroup label="All Abilities">{allAbilities.filter((a:string)=>!recAbilities.includes(a)).map((a:string)=><option key={a} value={a}>{a.replace(/-/g,' ')}</option>)}</optgroup>
          </select>
        </div>

        {/* Item */}
        <div className={styles.formRow}>
          <Star size={16} className={styles.formIcon}/>
          <select className={styles.selectField} value={member.selectedItem||''} onChange={e=>setItem(member.id,e.target.value||null)}>
            <option value="">— Held Item —</option>
            {recItems.length>0&&<optgroup label="⭐ Recommended">{recItems.map(i=><option key={i} value={i}>{i}</option>)}</optgroup>}
            <optgroup label="All Items">{COMPETITIVE_ITEMS.filter(i=>!recItems.includes(i)).map(i=><option key={i} value={i}>{i}</option>)}</optgroup>
          </select>
        </div>

        {/* Nature */}
        <div className={styles.formRow}>
          <Star size={16} className={styles.formIcon}/>
          <select className={styles.selectField} value={member.selectedNature||''} onChange={e=>setNature(member.id,e.target.value||null)}>
            <option value="">— Nature —</option>
            {recNatures.length>0&&<optgroup label="⭐ Recommended">{recNatures.map(n=><option key={n} value={n}>{n}</option>)}</optgroup>}
            <optgroup label="All Natures">{NATURE_NAMES.filter(n=>!recNatures.includes(n)).map(n=><option key={n} value={n}>{n}</option>)}</optgroup>
          </select>
        </div>

        {/* Moves */}
        <div>
          <span className={styles.movesSectionLabel}>Moves ({member.moves.length}/4)</span>
          <div className={styles.movesGrid}>
            {Array.from({length:4}).map((_,mi)=>{
              const sel = member.moves[mi];
              return (
                <select key={mi} className={styles.selectField}
                  value={sel?.name||''}
                  onChange={e=>{
                    const mv = allMoves.find((m:any)=>m.name===e.target.value);
                    if (mv) { const cur=[...member.moves]; cur[mi]=mv; setMoves(member.id,cur.filter(Boolean)); }
                    else if (!e.target.value) { const cur=[...member.moves]; cur.splice(mi,1); setMoves(member.id,cur.filter(Boolean)); }
                  }}>
                  <option value="">None</option>
                  {allMoves.map((m:any)=><option key={m.name} value={m.name}>{m.name.replace(/-/g,' ')}</option>)}
                </select>
              );
            })}
          </div>
        </div>

        <button className={styles.autoFillBtn} onClick={handleAutoFill} disabled={allMoves.length===0}>
          <Zap size={13}/> Auto-Build
        </button>
      </div>
    </div>
  );
}

export default function TeamBuilder() {
  const { team, addMember } = useTeamStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [toast, setToast] = useState<{msg:string;type:'success'|'error'|'info'}|null>(null);

  const showToast = (msg:string, type:'success'|'error'|'info'='success') => {
    setToast({msg,type});
    setTimeout(()=>setToast(null),3000);
  };

  const { data: listData } = useQuery(GET_POKEMON_FOR_TEAM, { variables:{search:searchQuery} });
  const available = listData?.pokemonList?.results || [];

  const handleAdd = (p:any) => {
    addMember({ id:p.id, name:p.name, types:p.types, image:p.image });
    setModalOpen(false);
  };

  // Export Showdown
  const exportShowdown = () => {
    setExportOpen(false);
    if (!team.length) { showToast('Team is empty!','error'); return; }
    const text = team.map(m=>{
      let t=`${m.name}`;
      if(m.selectedItem) t+=` @ ${m.selectedItem}`;
      t+='\n';
      if(m.selectedAbility) t+=`Ability: ${m.selectedAbility.replace('-',' ')}\n`;
      if(m.selectedNature) t+=`${m.selectedNature} Nature\n`;
      m.moves.forEach(mv=>{ if(mv?.name) t+=`- ${mv.name.replace('-',' ')}\n`; });
      return t;
    }).join('\n');
    navigator.clipboard.writeText(text).then(()=>showToast('Copied to clipboard!','success')).catch(()=>showToast('Copy failed','error'));
  };

  const exportJSON = () => {
    setExportOpen(false);
    if (!team.length) { showToast('Team is empty!','error'); return; }
    const blob = new Blob([JSON.stringify(team,null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='my-pokemon-team.json'; a.click();
    URL.revokeObjectURL(url);
    showToast('Saved as JSON!','success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) {
          const { setTeam } = useTeamStore.getState();
          setTeam(data.slice(0,6));
          showToast('Team imported!','success');
        } else showToast('Invalid JSON format','error');
      } catch { showToast('Failed to parse file','error'); }
    };
    reader.readAsText(file);
    e.target.value='';
  };

  // Synergy
  const getSynergy = () => {
    const cov: Record<string,{weak:number;resist:number}> = {};
    for (const t of TYPE_LIST) cov[t]={weak:0,resist:0};
    for (const p of team) {
      const mu = calculateDamageTaken(p.types[0], p.types[1]||null);
      for (const t of [...mu.x4,...mu.x2]) if(cov[t]) cov[t].weak++;
      for (const t of [...mu.x05,...mu.x025,...mu.x0]) if(cov[t]) cov[t].resist++;
    }
    const warnings: string[] = [];
    for (const t of TYPE_LIST) if (cov[t].weak>=3) warnings.push(`Highly vulnerable to ${t.toUpperCase()} (${cov[t].weak} Pokémon)`);
    return { cov, warnings };
  };

  const { cov, warnings } = getSynergy();

  // AI Recs
  const getAI = () => {
    const recs: {title:string;desc:string}[] = [];
    const hasAb = (a:string) => team.some(p=>p.selectedAbility?.toLowerCase()===a);
    const hasName = (n:string) => team.some(p=>p.name.toLowerCase()===n);
    const hasMove = (m:string) => team.some(p=>p.moves?.some(mv=>mv.name.toLowerCase()===m));
    if (hasAb('drizzle')||hasName('kyogre')||hasName('pelipper')) recs.push({title:'🌧️ Rain Core',desc:'Rain detected! Add Swift Swim users like Kingdra or Hurricane/Thunder users.'});
    if (hasAb('drought')||hasName('groudon')||hasName('torkoal')) recs.push({title:'☀️ Sun Core',desc:'Sun detected! Add Chlorophyll Pokémon like Venusaur or Fire-types with Solar Beam.'});
    if (hasAb('sand-stream')||hasName('tyranitar')||hasName('hippowdon')) recs.push({title:'⛈️ Sand Core',desc:'Sand detected! Consider Excadrill with Sand Rush for massive speed boost.'});
    const psyGhost = team.filter(p=>p.types.some(t=>t==='psychic'||t==='ghost')).length;
    if (hasMove('trick-room')||psyGhost>=2) recs.push({title:'🔮 Trick Room',desc:'Trick Room synergy! Add slow bulky Pokémon like Melmetal or Hatterene.'});
    if (!recs.length) recs.push(team.length>0
      ? {title:'⚔️ Balanced Team',desc:'No specific core detected. Focus on Fire/Water/Grass balance and physical/special attacker mix.'}
      : {title:'🎮 Build Your Squad!',desc:'Add Pokémon to your empty slots. Our AI will analyze type coverage and suggest synergy archetypes.'}
    );
    return recs;
  };

  const aiRecs = getAI();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}><Brain size={32}/> Team Builder</h1>
        <p className={styles.desc}>Assemble your competitive squad of 6. Get real-time type analysis, AI move recommendations, and export to Showdown format.</p>
        <div className={styles.headerActions}>
          <label className={styles.importBtn}>
            <Upload size={14}/> Import JSON
            <input type="file" accept=".json" hidden onChange={handleImport}/>
          </label>
          <div className={styles.exportDropdown}>
            <button className={styles.exportBtn} onClick={()=>setExportOpen(!exportOpen)}>
              <Zap size={14}/> Export Team <ChevronDown size={12}/>
            </button>
            {exportOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownItem} onClick={exportShowdown}><Copy size={14}/> Copy Showdown Text</div>
                <div className={styles.dropdownItem} onClick={exportJSON}><Download size={14}/> Save as JSON</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6 Slots */}
      <div className={styles.slotsGrid}>
        {Array.from({length:6}).map((_,idx)=>{
          const member = team[idx];
          return (
            <AnimatePresence key={idx} mode="wait">
              {member ? (
                <motion.div key="filled" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}} transition={{duration:0.2}}>
                  <MemberSlot member={member} index={idx}/>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <div className={styles.emptySlot} onClick={()=>setModalOpen(true)}>
                    <div className={styles.addIconWrap}><Plus size={24} className={styles.addIcon}/></div>
                    <span className={styles.addLabel}>Add Pokémon #{idx+1}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Analytics */}
      <div className={styles.analyticsGrid}>
        {/* Synergy */}
        <div className={styles.analyticPanel}>
          <h2 className={styles.panelTitle}><Shield size={20} style={{color:'#10b981'}}/> Team Synergy</h2>
          <span className={styles.panelDesc}>Defensive coverage summary. Avoid multiple Pokémon sharing the same weakness.</span>
          {team.length>0 && warnings.length>0 && warnings.map((w,i)=>(
            <div key={i} className={styles.alertWarning}><AlertTriangle size={14}/>{w}</div>
          ))}
          {team.length>0 && warnings.length===0 && (
            <div className={styles.alertSuccess}><CheckCircle size={14}/> Great defensive balance! No type is weak ×3 or more.</div>
          )}
          <div className={styles.typeGrid}>
            {TYPE_LIST.map(type=>{
              const c = cov[type]||{weak:0,resist:0};
              return (
                <div key={type} className={styles.typeTile}>
                  <span className={styles.typeChip} style={{background:TYPE_COLORS[type]||'#6b7280'}}>{type}</span>
                  <div className={styles.tileStats}>
                    <span className={styles.tileStat} style={{color:c.weak>0?'#ef4444':'var(--text-muted)'}}>▼{c.weak}</span>
                    <span className={styles.tileStat} style={{color:c.resist>0?'#22c55e':'var(--text-muted)'}}>▲{c.resist}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Coach */}
        <div className={styles.analyticPanel}>
          <h2 className={styles.panelTitle}><Brain size={20} style={{color:'#ec4899'}}/> AI Coach</h2>
          <span className={styles.panelDesc}>Strategic insights, weather cores, speed-tier guidelines from our simulated coach.</span>
          <div className={styles.recCards}>
            {aiRecs.map((r,i)=>(
              <div key={i} className={styles.recCard}>
                <div className={styles.recTitle}>{r.title}</div>
                <div className={styles.recDesc}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div className={styles.modalOverlay} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setModalOpen(false)}>
            <motion.div className={styles.modalCard} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}} onClick={e=>e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>Select Pokémon</span>
                <button className={styles.modalClose} onClick={()=>setModalOpen(false)}><X size={14}/></button>
              </div>
              <div className={styles.modalSearch}>
                <input placeholder="Search Pokémon..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
              </div>
              <div className={styles.modalList}>
                {available.map((p:any)=>(
                  <div key={p.id} className={styles.pokemonRow} onClick={()=>handleAdd(p)}>
                    <img src={p.image} alt={p.name}/>
                    <div className={styles.rowMeta}>
                      <div className={styles.rowName}>{p.name}</div>
                      <div className={styles.rowTypes}>
                        {p.types.map((t:string)=>(
                          <span key={t} className={styles.rowType} style={{background:TYPE_COLORS[t]||'#6b7280'}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {!available.length && (
                  <div className={styles.modalEmpty}><HelpCircle size={32} style={{opacity:0.4}}/><p className={styles.emptyText}>No Pokémon found</p></div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div className={`${styles.toast} ${styles[toast.type]}`} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
