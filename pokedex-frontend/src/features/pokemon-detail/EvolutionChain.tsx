import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { TYPE_COLORS } from '../../lib/utils';
import styles from './PokemonDetailDialog.module.scss';

interface Evolution {
  id: number;
  name: string;
  types: string[];
  image: string;
  minLevel?: number | null;
  trigger?: string | null;
}

interface EvolutionChainProps {
  evolutions: Evolution[];
  currentId: number;
  onSelect: (id: number) => void;
}

export const EvolutionChain: React.FC<EvolutionChainProps> = ({ evolutions, currentId, onSelect }) => {
  if (evolutions.length <= 1) return null;

  return (
    <div className={styles.evolutionChainSection}>
      <h4 className={styles.sectionTitle}>
        Evolution Chain
      </h4>

      <div className={styles.chainFlow}>
        {evolutions.map((evo, index) => (
          <React.Fragment key={evo.id}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(evo.id)}
              className={`${styles.evoNode} ${evo.id === currentId ? styles.currentNode : ''}`}
            >
              <div 
                className={styles.evoImageBg}
                style={{ backgroundColor: `${TYPE_COLORS[evo.types[0]]}22` }}
              >
                <img 
                  src={evo.image} 
                  alt={evo.name}
                  className={styles.evoImage}
                />
              </div>
              <span className={`${styles.evoName} ${evo.id === currentId ? styles.currentText : ''}`}>
                {evo.name}
              </span>
            </motion.button>

            {index < evolutions.length - 1 && (
              <div className={styles.evoLink}>
                <ChevronRight size={16} />
                {(evolutions[index + 1].minLevel || evolutions[index + 1].trigger) && (
                  <span className={styles.evoCondition}>
                    {evolutions[index + 1].minLevel 
                      ? `Lv. ${evolutions[index + 1].minLevel}` 
                      : evolutions[index + 1].trigger?.replace('-', ' ')}
                  </span>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
