import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Container, Box, Grid, Button, ButtonGroup, Typography, Alert, Skeleton, useTheme, alpha
} from '@mui/material';
import { AutoAwesome, Favorite, Compare } from '@mui/icons-material';
import { AnimatePresence } from 'motion/react';
import PokeCard from './PokeCard';
import SearchBar from './SearchBar';
import PokeDetail from './PokeDetail';
import CompareModal from './CompareModal';
import { PokemonListItem } from '../types';
import { useMyPokedex } from '../lib/MyPokedexContext';
import { useTeamStore } from '../lib/teamStore';
import { VERSION_COLORS, getRegionAndGame } from '../App';

const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int, $search: String, $type: String, $gen: Int, $ids: [Int!], $region: String, $game: String) {
    pokemonList(limit: $limit, offset: $offset, search: $search, type: $type, gen: $gen, ids: $ids, region: $region, game: $game) {
      results { id name types image shinyImage category regionalNumber speciesId }
      totalCount
    }
  }
`;

type ViewMode = 'all' | 'favorites' | 'compare';

// Custom Regional Dex for Legends: Z-A containing the starter lines and key Pokémon
const ZA_REGIONAL_DEX = [
  'chikorita', 'bayleef', 'meganium',
  'tepig', 'pignite', 'emboar',
  'totodile', 'croconaw', 'feraligatr',
  'bulbasaur', 'ivysaur', 'venusaur',
  'charmander', 'charmeleon', 'charizard',
  'squirtle', 'wartortle', 'blastoise',
  'pikachu', 'raichu',
  'greninja', 'zygarde'
];

export default function PokemonDex() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { selectedVersion } = useTeamStore();

  const [search, setSearch]           = useState('');
  const [typeFilter, setTypeFilter]   = useState('');
  const [genFilter, setGenFilter]     = useState<number | null>(null);
  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [viewMode, setViewMode]       = useState<ViewMode>('all');
  const [compareIds, setCompareIds]   = useState<number[]>([]);

  // State for Legends: Z-A custom PokéAPI fetch
  const [zaPokemonList, setZaPokemonList] = useState<PokemonListItem[]>([]);
  const [zaLoading, setZaLoading]         = useState(false);

  const { favorites } = useMyPokedex();
  const isCompareMode = viewMode === 'compare';
  const showFavorites = viewMode === 'favorites';

  const isZA = selectedVersion === 'legends-za';

  // Fetch Legends: Z-A regional data directly from PokéAPI, merging custom starters with Central Kalos Pokédex
  useEffect(() => {
    if (!isZA) return;

    const fetchZADex = async () => {
      setZaLoading(true);
      try {
        // 1. Lấy danh sách Central Kalos Pokédex (ID: 12)
        const kalosRes = await fetch('https://pokeapi.co/api/v2/pokedex/12/');
        let kalosNames: string[] = [];
        if (kalosRes.ok) {
          const kalosData = await kalosRes.json();
          kalosNames = kalosData.pokemon_entries.map((entry: any) => entry.pokemon_species.name);
        }

        // 2. Gộp danh sách Custom Z-A với Central Kalos Pokedex (Lọc trùng lặp)
        const mergedNames = Array.from(new Set([...ZA_REGIONAL_DEX, ...kalosNames]));

        // 3. Concurrently fetch details of each Pokemon
        const fetchDetailsPromises = mergedNames.map(async (name) => {
          try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!res.ok) return null;
            const data = await res.json();

            let category = 'Kalos Native';
            if (ZA_REGIONAL_DEX.includes(name)) {
              category = 'Starter Pokémon';
              if (name === 'greninja') category = 'Ninja Pokémon';
              if (name === 'zygarde') category = 'Order Pokémon';
            }

            return {
              id: data.id,
              name: data.name,
              types: data.types.map((t: any) => t.type.name),
              image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
              shinyImage: data.sprites.other['official-artwork'].front_shiny || data.sprites.front_shiny,
              category: category,
              regionalNumber: 0, // Will be updated sequentially
              speciesId: data.id
            };
          } catch (e) {
            console.error(`Error fetching detail for ${name}:`, e);
            return null;
          }
        });

        const rawDetails = await Promise.all(fetchDetailsPromises);
        const basePokemonList = rawDetails.filter((p): p is NonNullable<typeof p> => p !== null);

        // 4. Gán lại ID khu vực (Regional ID) bắt đầu từ #001 tịnh tiến cho mảng base
        basePokemonList.forEach((p, idx) => {
          p.regionalNumber = idx + 1;
        });

        // 5. Chèn Mega Forms ngay sau dạng tiến hóa cuối cùng và gán cùng mã vùng
        const finalResults: PokemonListItem[] = [];
        for (const p of basePokemonList) {
          finalResults.push(p);

          const regId = p.regionalNumber;
          const name = p.name;

          if (name === 'meganium') {
            finalResults.push({
              id: p.id + 10000,
              name: 'meganium-mega',
              types: ['grass', 'fairy'],
              image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/154.png',
              shinyImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/154.png',
              category: 'Mega Form',
              regionalNumber: regId,
              speciesId: p.id
            });
          } else if (name === 'emboar') {
            finalResults.push({
              id: p.id + 10000,
              name: 'emboar-mega',
              types: ['fire', 'fighting'],
              image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500.png',
              shinyImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/500.png',
              category: 'Mega Form',
              regionalNumber: regId,
              speciesId: p.id
            });
          } else if (name === 'feraligatr') {
            finalResults.push({
              id: p.id + 10000,
              name: 'feraligatr-mega',
              types: ['water', 'dark'],
              image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160.png',
              shinyImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/160.png',
              category: 'Mega Form',
              regionalNumber: regId,
              speciesId: p.id
            });
          } else if (name === 'venusaur') {
            try {
              const megaRes = await fetch(`https://pokeapi.co/api/v2/pokemon/venusaur-mega`);
              if (megaRes.ok) {
                const megaData = await megaRes.json();
                finalResults.push({
                  id: megaData.id,
                  name: 'venusaur-mega',
                  types: megaData.types.map((t: any) => t.type.name),
                  image: megaData.sprites.other['official-artwork'].front_default || megaData.sprites.front_default,
                  shinyImage: megaData.sprites.other['official-artwork'].front_shiny || megaData.sprites.front_shiny,
                  category: 'Mega Form',
                  regionalNumber: regId,
                  speciesId: p.id
                });
              }
            } catch (e) {}
          } else if (name === 'charizard') {
            try {
              const megaXRes = await fetch(`https://pokeapi.co/api/v2/pokemon/charizard-mega-x`);
              if (megaXRes.ok) {
                const megaXData = await megaXRes.json();
                finalResults.push({
                  id: megaXData.id,
                  name: 'charizard-mega-x',
                  types: megaXData.types.map((t: any) => t.type.name),
                  image: megaXData.sprites.other['official-artwork'].front_default || megaXData.sprites.front_default,
                  shinyImage: megaXData.sprites.other['official-artwork'].front_shiny || megaXData.sprites.front_shiny,
                  category: 'Mega Form X',
                  regionalNumber: regId,
                  speciesId: p.id
                });
              }
              const megaYRes = await fetch(`https://pokeapi.co/api/v2/pokemon/charizard-mega-y`);
              if (megaYRes.ok) {
                const megaYData = await megaYRes.json();
                finalResults.push({
                  id: megaYData.id,
                  name: 'charizard-mega-y',
                  types: megaYData.types.map((t: any) => t.type.name),
                  image: megaYData.sprites.other['official-artwork'].front_default || megaYData.sprites.front_default,
                  shinyImage: megaYData.sprites.other['official-artwork'].front_shiny || megaYData.sprites.front_shiny,
                  category: 'Mega Form Y',
                  regionalNumber: regId,
                  speciesId: p.id
                });
              }
            } catch (e) {}
          } else if (name === 'blastoise') {
            try {
              const megaRes = await fetch(`https://pokeapi.co/api/v2/pokemon/blastoise-mega`);
              if (megaRes.ok) {
                const megaData = await megaRes.json();
                finalResults.push({
                  id: megaData.id,
                  name: 'blastoise-mega',
                  types: megaData.types.map((t: any) => t.type.name),
                  image: megaData.sprites.other['official-artwork'].front_default || megaData.sprites.front_default,
                  shinyImage: megaData.sprites.other['official-artwork'].front_shiny || megaData.sprites.front_shiny,
                  category: 'Mega Form',
                  regionalNumber: regId,
                  speciesId: p.id
                });
              }
            } catch (e) {}
          }
        }

        setZaPokemonList(finalResults);
      } catch (err) {
        console.error('Error fetching/merging Legends Z-A Pokédex:', err);
      } finally {
        setZaLoading(false);
      }
    };

    fetchZADex();
  }, [isZA]);

  const handleCardClick = (id: number) => {
    if (isCompareMode) {
      setCompareIds(prev =>
        prev.includes(id) ? prev.filter(p => p !== id)
          : prev.length < 2 ? [...prev, id] : prev
      );
    } else {
      setSelectedId(id);
    }
  };

  const { region: rawRegion, game: rawGame } = getRegionAndGame(selectedVersion);
  const queryRegion = rawRegion !== 'ALL' ? rawRegion : undefined;
  const queryGame = rawGame !== 'ALL' ? rawGame : undefined;

  const { data, loading, error, fetchMore } = useQuery<{
    pokemonList: { results: PokemonListItem[]; totalCount: number };
  }>(GET_POKEMON_LIST, {
    variables: { 
      limit: 24, 
      offset: 0, 
      search, 
      type: typeFilter, 
      gen: genFilter, 
      ids: showFavorites ? favorites : null,
      region: queryRegion,
      game: queryGame
    },
    skip: isZA // Skip GraphQL query completely for Legends: Z-A custom regional dex
  });

  // Client-side search and type filtering for Legends: Z-A Custom Dex
  const filteredZaList = isZA 
    ? zaPokemonList.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter ? p.types.map(t => t.toLowerCase()).includes(typeFilter.toLowerCase()) : true;
        return matchesSearch && matchesType;
      })
    : [];

  const pokemonList  = isZA ? filteredZaList : (data?.pokemonList?.results || []);
  const totalCount   = isZA ? filteredZaList.length : (data?.pokemonList?.totalCount || 0);
  const hasMore      = !isZA && pokemonList.length > 0 && pokemonList.length < totalCount;

  const isZALoading  = isZA ? zaLoading : loading;
  const isZAError    = isZA ? null : error;

  const loadMore = () => {
    if (isZA) return;
    fetchMore({ variables: { offset: pokemonList.length } });
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 3, px: { xs: 2, sm: 3 } }}>
      
      {/* Search & Filter Section in body */}
      <Box sx={{ mb: 4 }}>
        <SearchBar
          value={search}         onChange={setSearch}
          typeValue={typeFilter} onTypeChange={setTypeFilter}
          genValue={genFilter}   onGenChange={setGenFilter}
        />
      </Box>

      {/* View Mode Toggle & Global Action bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4
        }}
      >
        <ButtonGroup variant="outlined" size="medium">
          {([
            { key: 'all',       label: 'All',                icon: <AutoAwesome sx={{ fontSize: 16 }} /> },
            { key: 'favorites', label: `Favs (${favorites.length})`, icon: <Favorite sx={{ fontSize: 16 }} /> },
            { key: 'compare',   label: compareIds.length === 2 ? 'Compare (2)' : 'Compare', icon: <Compare sx={{ fontSize: 16 }} /> },
          ] as const).map(({ key, label, icon }) => (
            <Button
              key={key}
              id={`view-mode-${key}`}
              startIcon={icon}
              onClick={() => { setViewMode(key); if (key !== 'compare') setCompareIds([]); }}
              variant={viewMode === key ? 'contained' : 'outlined'}
              color={key === 'favorites' && viewMode === key ? 'secondary' : 'primary'}
              sx={{ px: 3, fontWeight: viewMode === key ? 800 : 600, borderRadius: '12px' }}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Count */}
      {!isZALoading && !isZAError && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, textAlign: 'center', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>
          {totalCount} Pokémon {search ? `matching "${search}"` : ''}{genFilter ? ` · Gen ${genFilter}` : ''}
        </Typography>
      )}

      {/* Compare banner */}
      {isCompareMode && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 3, fontWeight: 700 }}>
          {compareIds.length === 0 && 'Select 2 Pokémon to compare.'}
          {compareIds.length === 1 && 'Select 1 more Pokémon.'}
          {compareIds.length === 2 && 'Ready! Click a card to compare.'}
        </Alert>
      )}

      {/* Grid */}
      {isZALoading ? (
        <Grid container spacing={3}>
          {[...Array(12)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Skeleton variant="rounded" height={280} sx={{ borderRadius: 4 }} />
            </Grid>
          ))}
        </Grid>
      ) : isZAError ? (
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          Backend offline — start the server on port 3000.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
            {pokemonList.map((p: PokemonListItem, idx: number) => (
              <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <PokeCard
                  pokemon={p}
                  index={idx % 12}
                  onClick={() => handleCardClick(p.id)}
                  isCompareMode={isCompareMode}
                  isSelectedForCompare={compareIds.includes(p.id)}
                />
              </Grid>
            ))}
          </AnimatePresence>

          {pokemonList.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 10, color: 'text.disabled' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>No Pokémon found.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {!isZALoading && hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 10 }}>
          <Button variant="outlined" size="large" onClick={loadMore} sx={{ px: 6, borderRadius: 50 }}>
            Load More
          </Button>
        </Box>
      )}

      <PokeDetail id={selectedId} onClose={() => setSelectedId(null)} onSelect={setSelectedId} />
      <CompareModal ids={compareIds} onClose={() => { setCompareIds([]); setViewMode('all'); }} />
    </Container>
  );
}
