import { useState } from 'react';
import { Editor } from '@tiptap/react';
import { useQuery, gql } from '@apollo/client';
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Table, Target, X, Loader } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import styles from '../styles/components/EditorToolbar.module.scss';

const GET_POKEMON_SUGGESTIONS = gql`
  query GetPokemonSuggestions($search: String) {
    pokemonList(limit: 10, search: $search) {
      results { id name image }
    }
  }
`;

interface EditorToolbarProps { editor: Editor | null; }

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const [spriteOpen, setSpriteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [selectedPokemon, setSelectedPokemon] = useState<{ id: number; name: string; image: string } | null>(null);

  const { data, loading } = useQuery(GET_POKEMON_SUGGESTIONS, {
    variables: { search: debouncedSearch },
    skip: !spriteOpen,
  });

  if (!editor) return null;

  const handleInsertSprite = () => {
    if (selectedPokemon) {
      const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`;
      editor.chain().focus().setImage({ src: spriteUrl, alt: selectedPokemon.name }).run();
      setSpriteOpen(false);
      setSelectedPokemon(null);
      setSearchTerm('');
    }
  };

  const btnStyle = (active: boolean) => ({
    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 8, border: 'none', cursor: 'pointer',
    background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
    color: active ? '#6366f1' : 'var(--text-secondary)',
    transition: 'all 0.15s',
  });

  return (
    <>
      <div className={styles.toolbar}>
        <button title="Bold (Ctrl+B)" style={btnStyle(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={14}/>
        </button>
        <button title="Italic (Ctrl+I)" style={btnStyle(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={14}/>
        </button>
        <div className={styles.divider}/>
        <button title="Heading 1" style={btnStyle(editor.isActive('heading',{level:1}))} onClick={() => editor.chain().focus().toggleHeading({level:1}).run()}>
          <Heading1 size={14}/>
        </button>
        <button title="Heading 2" style={btnStyle(editor.isActive('heading',{level:2}))} onClick={() => editor.chain().focus().toggleHeading({level:2}).run()}>
          <Heading2 size={14}/>
        </button>
        <div className={styles.divider}/>
        <button title="Bullet List" style={btnStyle(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={14}/>
        </button>
        <button title="Ordered List" style={btnStyle(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={14}/>
        </button>
        <div className={styles.divider}/>
        <button title="Insert Table" style={btnStyle(false)} onClick={() => editor.chain().focus().insertTable({rows:3,cols:3,withHeaderRow:true}).run()}>
          <Table size={14}/>
        </button>
        <button title="Insert Pokémon Sprite" style={{...btnStyle(false),color:'#ec4899'}} onClick={() => setSpriteOpen(true)}>
          <Target size={14}/>
        </button>
      </div>

      {/* Sprite Picker Modal */}
      {spriteOpen && (
        <div className={styles.overlay} onClick={() => setSpriteOpen(false)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Insert Pokémon Sprite</span>
              <button onClick={() => setSpriteOpen(false)} className={styles.closeBtn}><X size={16}/></button>
            </div>
            <div className={styles.modalBody}>
              <input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search Pokémon name..."
                autoFocus
                className={styles.searchInput}
              />
              <div className={styles.pokemonList}>
                {loading && <div style={{ display:'flex',justifyContent:'center',padding:16 }}><Loader size={20} style={{ animation:'spin 0.8s linear infinite' }}/></div>}
                {(data?.pokemonList?.results || []).map((p: any) => (
                  <div key={p.id}
                    onClick={() => setSelectedPokemon(p)}
                    className={`${styles.pokemonRow} ${selectedPokemon?.id===p.id ? styles.selected : ''}`}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`} alt={p.name} className={styles.pokemonImage}/>
                    <span className={styles.pokemonName}>#{p.id} - {p.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setSpriteOpen(false)} className={styles.cancelBtn}>
                Cancel
              </button>
              <button onClick={handleInsertSprite} disabled={!selectedPokemon}
                className={`${styles.insertBtn} ${selectedPokemon ? styles.active : ''}`}>
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
