import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { motion, AnimatePresence } from 'motion/react';
import {
  Map,
  Search,
  Filter,
  ChevronRight,
  X,
  HelpCircle,
  Footprints,
  Waves,
  Fish,
  MapPin
} from 'lucide-react';
import { GENERATION_VERSIONS, VERSION_COLORS } from '../App';
import styles from '../styles/pages/LocationDex.module.scss';

// GraphQL Queries
const GET_LOCATIONS = gql`
  query GetLocations($version: String!) {
    getLocations(version: $version)
  }
`;

const GET_LOCATION_ENCOUNTERS = gql`
  query GetLocationEncounters($locationName: String!, $version: String!) {
    getLocationEncounters(locationName: $locationName, version: $version) {
      id
      pokemonId
      locationName
      versionName
      method
      minLevel
      maxLevel
      chance
      pokemon {
        id
        name
        types
        image
        category
      }
    }
  }
`;

// Type to color mapping for Pokemon types
const TYPE_COLORS: Record<string, string> = {
  normal: '#9ca3af',
  fire: '#f97316',
  water: '#3b82f6',
  electric: '#eab308',
  grass: '#22c55e',
  ice: '#06b6d4',
  fighting: '#ef4444',
  poison: '#a855f7',
  ground: '#d97706',
  flying: '#818cf8',
  psychic: '#ec4899',
  bug: '#84cc16',
  rock: '#78716c',
  ghost: '#7c3aed',
  dragon: '#1d4ed8',
  dark: '#374151',
  steel: '#6b7280',
  fairy: '#f472b6',
};

// Formatter helper for location area names
const formatLocationName = (name: string): string => {
  if (!name) return '';
  return name
    .split('-')
    .map((word) => {
      if (word.toLowerCase() === 'route') return 'Route';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const getMethodIcon = (method: string) => {
  const lower = method.toLowerCase();
  if (lower.includes('walk')) return <Footprints size={16} />;
  if (lower.includes('surf') || lower.includes('water')) return <Waves size={16} />;
  if (lower.includes('rod') || lower.includes('fish')) return <Fish size={16} />;
  return <MapPin size={16} />;
};

function hexToRgb(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export default function LocationDex() {
  // Version Selection State
  const [selectedVersion, setSelectedVersion] = useState<string>('platinum');
  const [versionModalOpen, setVersionModalOpen] = useState(false);

  // Search & Filtering States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Query Locations
  const { data: locationsData, loading: locationsLoading, error: locationsError } = useQuery<{
    getLocations: string[];
  }>(GET_LOCATIONS, {
    variables: { version: selectedVersion },
  });

  // Query Encounters for Drawer
  const { data: encountersData, loading: encountersLoading, error: encountersError } = useQuery<{
    getLocationEncounters: any[];
  }>(GET_LOCATION_ENCOUNTERS, {
    variables: {
      locationName: selectedLocation || '',
      version: selectedVersion
    },
    skip: !selectedLocation
  });

  const locationsList = locationsData?.getLocations || [];
  const encounters = encountersData?.getLocationEncounters || [];

  // Filter routes based on search bar
  const filteredLocations = locationsList.filter((loc) =>
    loc.toLowerCase().replace(/-/g, ' ').includes(searchTerm.toLowerCase())
  );

  const handleOpenLocation = (locName: string) => {
    setSelectedLocation(locName);
    setDrawerOpen(true);
  };

  const handleCloseLocation = () => {
    setDrawerOpen(false);
  };

  const handleSelectVersion = (version: string) => {
    setSelectedVersion(version);
    setVersionModalOpen(false);
  };

  // Grouping logic for encounter methods
  const groupedEncounters = encounters.reduce((acc: Record<string, any[]>, enc: any) => {
    const method = enc.method || 'walk';
    if (!acc[method]) acc[method] = [];
    acc[method].push(enc);
    return acc;
  }, {});

  const getRarityDetails = (chance: number) => {
    if (chance <= 5) return { color: '#ef4444', label: 'Rare' };
    if (chance <= 20) return { color: '#f97316', label: 'Uncommon' };
    return { color: '#22c55e', label: 'Common' };
  };

  return (
    <div className={styles.container}>
      
      {/* Page Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Map className={styles.icon} />
          Location Dex
        </h1>
        <p className={styles.subtitle}>
          Map out wilderness regions, routes, and cave systems to analyze encounter rates.
        </p>

        {/* Current Selected Game Version Indicator */}
        <button
          className={styles.versionBadgeBtn}
          onClick={() => setVersionModalOpen(true)}
          style={{
            borderColor: VERSION_COLORS[selectedVersion] || '#ec4899',
            boxShadow: `0 8px 24px ${(VERSION_COLORS[selectedVersion] || '#ec4899')}44`,
            backgroundColor: VERSION_COLORS[selectedVersion] || '#ec4899',
          }}
        >
          <Filter size={14} />
          Version: {selectedVersion.replace(/-/g, ' ')}
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search routes or areas..."
          className={styles.searchInput}
          style={{
            '--primary': VERSION_COLORS[selectedVersion] || '#ec4899',
          } as React.CSSProperties}
        />
      </div>

      {/* Content Area */}
      {locationsError ? (
        <div className={styles.alertBox}>
          Could not fetch locations from server. Please verify backend is running.
        </div>
      ) : locationsLoading && locationsList.length === 0 ? (
        /* Loading Skeletons */
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 16 }).map((_, idx) => (
            <div className={styles.skeletonItem} key={idx} />
          ))}
        </div>
      ) : (
        /* Routes List Grid */
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredLocations.map((locName, index) => (
              <motion.div
                key={locName}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
                whileHover={{ y: -3 }}
              >
                <div
                  className={styles.locationCard}
                  onClick={() => handleOpenLocation(locName)}
                  onMouseEnter={(e) => {
                    const color = VERSION_COLORS[selectedVersion] || '#ec4899';
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.infoBlock}>
                      <div 
                        className={styles.iconBg}
                        style={{
                          backgroundColor: `${(VERSION_COLORS[selectedVersion] || '#ec4899')}22`,
                          color: VERSION_COLORS[selectedVersion] || '#ec4899',
                        }}
                      >
                        <Map size={18} />
                      </div>
                      <span className={styles.locName}>
                        {formatLocationName(locName)}
                      </span>
                    </div>
                    <ChevronRight className={styles.chevron} size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {filteredLocations.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <HelpCircle size={48} />
              </div>
              <h6 className={styles.emptyTitle}>No Locations found.</h6>
              <p className={styles.emptyDesc}>Try adjusting your filters or game version.</p>
            </div>
          )}
        </div>
      )}

      {/* Version Selector Dialog */}
      <AnimatePresence>
        {versionModalOpen && (
          <div className={styles.modalOverlay} onClick={() => setVersionModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>Select Game Version</span>
                <button className={styles.closeBtn} onClick={() => setVersionModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className={styles.modalBody}>
                {GENERATION_VERSIONS.map((g) => (
                  <div key={g.gen} className={styles.genSection}>
                    <div className={styles.genHeader}>
                      <span className={styles.genTitle}>{g.gen}</span>
                      <div className={styles.divider} />
                    </div>
                    <div className={styles.gamesGrid}>
                      {g.rows.map((row, rowIdx) => (
                        <div 
                          key={rowIdx} 
                          className={`${styles.gamesRow} ${row.type === 'pair' ? '' : styles.single}`}
                        >
                          {row.games.map((game) => {
                            const isSelected = selectedVersion.toLowerCase() === game.name.toLowerCase();
                            let vColor = VERSION_COLORS[game.name] || '#6366f1';
                            
                            if (vColor.toLowerCase() === '#000000' || vColor === 'black' || vColor === '#000') {
                              vColor = '#555555';
                            }

                            const getContrastColor = (color: string) => {
                              const c = color.toLowerCase();
                              if (c === '#eab308' || c === '#fbbf24' || c === '#a5f3fc' || c === '#e5e7eb' || c === '#ffffff') {
                                  return '#0f172a';
                              }
                              return '#ffffff';
                            };

                            const contrastColor = getContrastColor(vColor);

                            return (
                              <button
                                key={game.name}
                                className={styles.gameBtn}
                                onClick={() => handleSelectVersion(game.name)}
                                style={isSelected ? {
                                  backgroundColor: vColor,
                                  borderColor: vColor,
                                  color: contrastColor,
                                  boxShadow: `0 8px 24px ${vColor}44`,
                                } : {}}
                              >
                                <div 
                                  className={styles.gameDot}
                                  style={{
                                    backgroundColor: isSelected ? contrastColor : vColor,
                                    boxShadow: isSelected ? 'none' : `0 0 8px ${vColor}`,
                                  }}
                                />
                                <span className={styles.gameLabel}>{game.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.cancelBtn} onClick={() => setVersionModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Location Details Drawer */}
      <AnimatePresence>
        {drawerOpen && selectedLocation && (
          <div className={styles.drawerOverlay} onClick={handleCloseLocation}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={styles.drawerContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className={styles.drawerHeader}
                style={{ backgroundColor: VERSION_COLORS[selectedVersion] || '#ec4899' }}
              >
                <div>
                  <h5 className={styles.drawerTitle}>
                    {formatLocationName(selectedLocation)}
                  </h5>
                  <span className={styles.drawerSubtitle}>
                    Wild Encounters · {selectedVersion.replace(/-/g, ' ')}
                  </span>
                </div>
                <button className={styles.closeBtn} onClick={handleCloseLocation}>
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className={styles.drawerBody}>
                {encountersError ? (
                  <div className={styles.alertBox}>Failed to load encounter tables.</div>
                ) : encountersLoading ? (
                  /* Detail Loader Skeletons */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {Array.from({ length: 3 }).map((_, gIdx) => (
                      <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div className={styles.skeletonItem} style={{ height: '20px', width: '120px' }} />
                        <div className={styles.skeletonItem} style={{ height: '80px' }} />
                        <div className={styles.skeletonItem} style={{ height: '80px' }} />
                      </div>
                    ))}
                  </div>
                ) : Object.keys(groupedEncounters).length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                      <HelpCircle size={48} />
                    </div>
                    <h6 className={styles.emptyTitle}>No encounter details found.</h6>
                    <p className={styles.emptyDesc}>No Pokémon spawn recorded for this version.</p>
                  </div>
                ) : (
                  /* Grouped Encounter List */
                  Object.keys(groupedEncounters).map((method) => (
                    <div key={method} className={styles.methodSection}>
                      {/* Method Heading */}
                      <div className={styles.methodHeader}>
                        <div className={styles.methodIconBg}>
                          {getMethodIcon(method)}
                        </div>
                        <span className={styles.methodTitle}>
                          {method.replace(/-/g, ' ')}
                        </span>
                      </div>

                      {/* Method encounter items */}
                      <div className={styles.encountersGrid}>
                        {groupedEncounters[method].map((enc: any) => {
                          const primaryType = enc.pokemon?.types?.[0]?.toLowerCase() || 'normal';
                          const typeColor = TYPE_COLORS[primaryType] || '#9ca3af';
                          const rarity = getRarityDetails(enc.chance);

                          return (
                            <div
                              key={enc.id}
                              className={styles.encounterRow}
                              style={{
                                backgroundColor: `rgba(${hexToRgb(typeColor)}, 0.08)`,
                                borderColor: `rgba(${hexToRgb(typeColor)}, 0.12)`,
                              }}
                            >
                              {/* Left Box: Info, level, version */}
                              <div className={styles.encounterInfo}>
                                <h6 className={styles.pkName}>
                                  {enc.pokemon?.name?.replace(/-/g, ' ')}
                                </h6>
                                <span className={styles.pkLevel}>
                                  Lv. {enc.minLevel === enc.maxLevel ? enc.minLevel : `${enc.minLevel}-${enc.maxLevel}`}
                                </span>
                                <span 
                                  className={styles.versionBadge}
                                  style={{ backgroundColor: VERSION_COLORS[selectedVersion] || '#ec4899' }}
                                >
                                  {selectedVersion}
                                </span>
                              </div>

                              {/* Middle Box: Rarity Percentage */}
                              <div className={styles.rarityColumn}>
                                <div
                                  className={styles.rarityBadge}
                                  style={{
                                    backgroundColor: `${rarity.color}15`,
                                    borderColor: `${rarity.color}33`,
                                    color: rarity.color,
                                  }}
                                >
                                  {enc.chance}%
                                </div>
                                <span className={styles.rarityLabel}>
                                  {rarity.label}
                                </span>
                              </div>

                              {/* Right Box: Floating Pokemon sprite */}
                              <img
                                src={enc.pokemon?.image}
                                alt={enc.pokemon?.name}
                                className={styles.pkSprite}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
