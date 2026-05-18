import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Pencil, Trash2, Save, Plus, List, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import EditorToolbar from './EditorToolbar';
import { VERSION_COLORS } from '../App';
import styles from './AdminWalkthrough.module.scss';

const GET_WALKTHROUGHS = gql`
  query GetWalkthroughs($gameVersion: String!, $language: String!) {
    getWalkthroughs(gameVersion: $gameVersion, language: $language) {
      id gameVersion chapterTitle description coverImage content order language
    }
  }
`;
const UPSERT_WALKTHROUGH = gql`
  mutation UpsertWalkthrough($id: Int, $gameVersion: String!, $chapterTitle: String!, $description: String, $coverImage: String, $content: String!, $order: Int!, $language: String) {
    upsertWalkthrough(id: $id, gameVersion: $gameVersion, chapterTitle: $chapterTitle, description: $description, coverImage: $coverImage, content: $content, order: $order, language: $language) {
      id gameVersion chapterTitle description coverImage content order language
    }
  }
`;
const DELETE_WALKTHROUGH = gql`mutation DeleteWalkthrough($id: Int!) { deleteWalkthrough(id: $id) }`;

const GAME_OPTIONS = [
  {value:'red',label:'Red'},{value:'blue',label:'Blue'},{value:'yellow',label:'Yellow'},
  {value:'gold',label:'Gold'},{value:'silver',label:'Silver'},{value:'crystal',label:'Crystal'},
  {value:'ruby',label:'Ruby'},{value:'sapphire',label:'Sapphire'},{value:'emerald',label:'Emerald'},
  {value:'firered',label:'FireRed'},{value:'leafgreen',label:'LeafGreen'},
  {value:'diamond',label:'Diamond'},{value:'pearl',label:'Pearl'},{value:'platinum',label:'Platinum'},
  {value:'heartgold',label:'HeartGold'},{value:'soulsilver',label:'SoulSilver'},
  {value:'black',label:'Black'},{value:'white',label:'White'},{value:'black-2',label:'Black 2'},{value:'white-2',label:'White 2'},
  {value:'x',label:'X'},{value:'y',label:'Y'},{value:'omega-ruby',label:'Omega Ruby'},{value:'alpha-sapphire',label:'Alpha Sapphire'},
  {value:'sun',label:'Sun'},{value:'moon',label:'Moon'},{value:'ultra-sun',label:'Ultra Sun'},{value:'ultra-moon',label:'Ultra Moon'},
  {value:'sword',label:'Sword'},{value:'shield',label:'Shield'},
  {value:'scarlet',label:'Scarlet'},{value:'violet',label:'Violet'},
];

export default function AdminWalkthrough() {
  const [gameVersion, setGameVersion] = useState('emerald');
  const [language, setLanguage] = useState('vi');
  const [chapterTitle, setChapterTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [order, setOrder] = useState<number>(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{msg:string;type:'success'|'error'}|null>(null);

  const showToast = (msg: string, type: 'success'|'error') => {
    setToast({msg,type});
    setTimeout(() => setToast(null), 4000);
  };

  const { data, loading, refetch } = useQuery(GET_WALKTHROUGHS, { variables:{ gameVersion, language } });
  const [upsertWalkthrough, { loading: saving }] = useMutation(UPSERT_WALKTHROUGH);
  const [deleteWalkthrough] = useMutation(DELETE_WALKTHROUGH);

  const editor = useEditor({
    extensions: [StarterKit, Image, Table.configure({resizable:true}), TableRow, TableHeader, TableCell],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor-inner-input focus:outline-none',
        style: 'min-height:380px;padding:18px;color:var(--text-primary);font-family:sans-serif;font-size:0.95rem;line-height:1.6;'
      }
    }
  });

  const handleResetForm = () => {
    setEditingId(null); setChapterTitle(''); setDescription(''); setCoverImage('');
    const existing = data?.getWalkthroughs || [];
    setOrder(existing.length > 0 ? Math.max(...existing.map((c: any) => c.order)) + 1 : 1);
    editor?.commands.setContent('');
  };

  const handleSave = async () => {
    if (!chapterTitle.trim()) { showToast('Please enter a chapter title!','error'); return; }
    const htmlContent = editor?.getHTML() || '';
    if (!htmlContent.trim() || htmlContent === '<p></p>') { showToast('Please enter some guide content!','error'); return; }
    try {
      await upsertWalkthrough({ variables:{ id:editingId, gameVersion, chapterTitle, description, coverImage, content:htmlContent, order:Number(order), language } });
      showToast('Chapter saved successfully! 🚀','success');
      refetch(); handleResetForm();
    } catch (err: any) { showToast(`Error saving: ${err.message}`,'error'); }
  };

  const handleEdit = (ch: any) => {
    setEditingId(ch.id); setChapterTitle(ch.chapterTitle); setDescription(ch.description||'');
    setCoverImage(ch.coverImage||''); setOrder(ch.order); setLanguage(ch.language||'vi');
    editor?.commands.setContent(ch.content);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this chapter permanently?')) {
      try {
        await deleteWalkthrough({ variables:{ id } });
        showToast('Chapter deleted!','success');
        refetch();
        if (editingId === id) handleResetForm();
      } catch (err: any) { showToast(`Error: ${err.message}`,'error'); }
    }
  };

  const walkthroughs = data?.getWalkthroughs || [];
  const gameColor = VERSION_COLORS[gameVersion] || '#6366f1';

  return (
    <div className={styles.container}>
      <style>{`
        .tiptap-editor-inner-input table { border-collapse:collapse;width:100%;margin:16px 0; }
        .tiptap-editor-inner-input table th,.tiptap-editor-inner-input table td { border:1px solid rgba(255, 255, 255, 0.12);padding:8px 12px;text-align:left;min-width:100px; }
        .tiptap-editor-inner-input table th { background:rgba(255,255,255,0.05);font-weight:bold; }
        .tiptap-editor-inner-input img { max-width:64px;display:inline-block;vertical-align:middle;margin:4px;transition:transform 0.2s; }
        .tiptap-editor-inner-input img:hover { transform:scale(1.15); }
        .tiptap-editor-inner-input blockquote { border-left:4px solid #6366f1;padding-left:16px;margin-left:0;color:#a0aec0;font-style:italic; }
        .tiptap-editor-inner-input p { margin-bottom:10px; }
        .tiptap-editor-inner-input ul,.tiptap-editor-inner-input ol { padding-left:24px;margin-bottom:10px; }
      `}</style>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            <List size={28}/> Walkthrough CMS Admin
          </h1>
          <p className={styles.desc}>Quản trị và xây dựng các bài viết hướng dẫn game.</p>
        </div>
        <button onClick={() => window.open('/walkthrough','_blank')} className={styles.viewBtn}>
          View Walkthroughs 📖
        </button>
      </div>

      <div className={styles.grid}>
        {/* Left Panel */}
        <div className={styles.leftCol}>
          {/* Settings Card */}
          <div className={styles.card}>
            <span className={styles.cardTitle}>Chapter Settings</span>
            <div className={styles.divider}/>

            <div className={styles.formGroup}>
              <label className={styles.label}>Game Version</label>
              <select value={gameVersion} onChange={e => { setGameVersion(e.target.value); handleResetForm(); }} className={styles.selectField}>
                {GAME_OPTIONS.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Language</label>
              <select value={language} onChange={e => { setLanguage(e.target.value); handleResetForm(); }} className={styles.selectField}>
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Chapter Title *</label>
              <input value={chapterTitle} onChange={e => setChapterTitle(e.target.value)}
                placeholder="e.g. 1. Rustboro City & First Gym" className={styles.inputField}/>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Short description of this chapter..." rows={2}
                className={styles.textareaField}/>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Cover Image URL</label>
              <input value={coverImage} onChange={e => setCoverImage(e.target.value)}
                placeholder="https://example.com/banner.jpg" className={styles.inputField}/>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Order</label>
              <input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} className={styles.inputField}/>
            </div>

            <div className={styles.btnRow}>
              <button onClick={handleResetForm} className={styles.resetBtn}>
                <Plus size={14}/> Reset
              </button>
              <button onClick={handleSave} disabled={saving} className={styles.saveBtn}
                style={{ background:`linear-gradient(135deg,${gameColor},#1e1b4b)`,opacity:saving?0.7:1 }}>
                {saving ? <Loader size={13} style={{ animation:'spin 0.8s linear infinite' }}/> : <Save size={13}/>}
                {editingId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>

          {/* Chapter List */}
          <div className={styles.card}>
            <span className={styles.cardTitle}>Chapter List ({walkthroughs.length})</span>
            <span className={styles.cardSub}>Danh sách chương hiện tại. Click để sửa.</span>
            <div className={styles.divider}/>

            {loading ? (
              <div style={{ display:'flex',justifyContent:'center',padding:24 }}><Loader size={20} style={{ animation:'spin 0.8s linear infinite' }}/></div>
            ) : walkthroughs.length === 0 ? (
              <div style={{ textAlign:'center',padding:'32px 0',opacity:0.5 }}>
                <p style={{ fontSize:13,fontWeight:700,color:'var(--text-secondary)' }}>No chapters found</p>
                <p style={{ fontSize:11,color:'var(--text-muted)',marginTop:4 }}>Start creating the first chapter!</p>
              </div>
            ) : (
              <div className={styles.chaptersList}>
                {walkthroughs.map((ch: any) => (
                  <div key={ch.id} className={styles.chapterRow}
                    style={{ border: editingId === ch.id ? `1px solid ${gameColor}55` : '1px solid var(--border-main)', background: editingId === ch.id ? `${gameColor}12` : 'transparent' }}
                    onClick={() => handleEdit(ch)}>
                    {ch.coverImage && <img src={ch.coverImage} className={styles.chapterCover}/>}
                    <span className={styles.chapterTitleText}>{ch.order}: {ch.chapterTitle}</span>
                    <div className={styles.actionRow}>
                      <button onClick={e => { e.stopPropagation(); handleEdit(ch); }} className={`${styles.actionBtn} ${styles.edit}`}>
                        <Pencil size={12}/>
                      </button>
                      <button onClick={e => { e.stopPropagation(); handleDelete(ch.id); }} className={`${styles.actionBtn} ${styles.delete}`}>
                        <Trash2 size={12}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className={styles.rightCol}>
          <div style={{ padding:'20px 20px 12px' }}>
            <span className={styles.cardTitle} style={{ marginBottom:0 }}>Content WYSIWYG Editor</span>
            <span className={styles.cardSub} style={{ marginBottom:0, marginTop:4 }}>Soạn thảo nội dung trực quan. Chèn tables và Pokémon sprites.</span>
          </div>
          <div className={styles.divider} style={{ margin:'0 20px', marginBottom:0 }}/>

          <div className={styles.editorWrapper}>
            <EditorToolbar editor={editor}/>
            <div style={{ flex:1,overflowY:'auto',minHeight:380 }}>
              <EditorContent editor={editor}/>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={styles.toast} style={{ background:toast.type==='success'?'#22c55e':'#ef4444' }}>
          {toast.type==='success' ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
          {toast.msg}
        </div>
      )}
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}
