import { useQuery } from '@apollo/client';
import { ChevronRight } from 'lucide-react';
import { PokemonArtwork } from '../../components/PokemonArtwork';
import { resolveReferenceArtwork } from '../../hooks/useReferencePokemon';
import { formatSpeciesId, TYPE_COLORS } from '../../lib/utils';
import { REFERENCE_LIST } from '../../services/graphql/reference.queries';
import type { PokemonListItem } from '../../types';
import styles from '../../styles/features/PokemonDetailDialog.module.scss';

type Edge = { fromSpeciesId: number; toSpeciesId: number };

interface EvolutionChainProps {
  edges: Edge[];
  currentSpeciesId: number;
  shiny: boolean;
  onSelect?: (id: number) => void;
}

export function EvolutionChain({ edges, currentSpeciesId, shiny, onSelect }: EvolutionChainProps) {
  const uniqueEdges = [...new Map(edges.map(edge => [
    `${edge.fromSpeciesId}/${edge.toSpeciesId}`, edge,
  ])).values()];
  const ids = [...new Set(uniqueEdges.flatMap(edge => [edge.fromSpeciesId, edge.toSpeciesId]))];
  const { data } = useQuery<{ referencePokemonList: { results: PokemonListItem[] } }>(
    REFERENCE_LIST, { variables: { filters: { ids, limit: ids.length, category: 'DEFAULT' } }, skip: !ids.length },
  );
  if (!uniqueEdges.length) return null;

  const destinations = new Set(uniqueEdges.map(edge => edge.toSpeciesId));
  const children = new Map<number, number[]>();
  for (const edge of uniqueEdges) {
    children.set(edge.fromSpeciesId, [...(children.get(edge.fromSpeciesId) ?? []), edge.toSpeciesId]);
  }
  function pathsFrom(id: number, path: number[]): number[][] {
    const nextPath = [...path, id];
    const nextIds = children.get(id)?.filter(next => !nextPath.includes(next)) ?? [];
    return nextIds.length ? nextIds.flatMap(next => pathsFrom(next, nextPath)) : [nextPath];
  }
  const paths = ids.filter(id => !destinations.has(id)).flatMap(id => pathsFrom(id, []));

  const nodes = new Map(data?.referencePokemonList.results.map(row => [
    row.speciesId, resolveReferenceArtwork(row),
  ]));
  function node(speciesId: number) {
    const pokemon = nodes.get(speciesId);
    const name = pokemon?.name ?? formatSpeciesId(speciesId);
    return (
      <button type="button" className={`${styles.evoNode} ${speciesId === currentSpeciesId ? styles.currentNode : ''}`}
        onClick={() => pokemon && onSelect?.(pokemon.id)} disabled={!pokemon || !onSelect}
        aria-label={name.replaceAll('-', ' ')} aria-current={speciesId === currentSpeciesId ? 'true' : undefined}>
        <span className={styles.evoImageBg} style={{ backgroundColor: pokemon ? `${TYPE_COLORS[pokemon.types[0]]}25` : undefined }}>
          {pokemon && <PokemonArtwork src={shiny ? pokemon.shinyImage : pokemon.image} name={name} shiny={shiny} className={styles.evoImage} />}
        </span>
        <span className={styles.evoName}>{name.replaceAll('-', ' ')}</span>
      </button>
    );
  }

  return (
    <section className={styles.evolutionChainSection}>
      <h4 className={styles.sectionTitle}>Evolution Chain</h4>
      <div className={styles.chainFlow}>
        {paths.map(path => (
          <div className={styles.evolutionPath} key={path.join('/')}>
            {path.map((id, index) => (
              <span key={id} className={styles.evolutionStep}>
                {index > 0 && <ChevronRight className={styles.evoLink} size={18} aria-label="evolves into" />}
                {node(id)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
