import React from 'react';
import { motion } from 'motion/react';
import {
  Zap, Brain, Backpack, Map, Layers, Compass
} from 'lucide-react';
import styles from '../styles/components/Placeholders.module.scss';

interface PlaceholderDexProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
}

function BasePlaceholderDex({ title, subtitle, icon, gradient }: PlaceholderDexProps) {
  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={styles.card}>
          {/* Background decorative glow */}
          <div
            className={styles.glowBg}
            style={{
              background: gradient,
            }}
          />

          {/* Animated Glowing Icon Wrapper */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ zIndex: 1 }}
          >
            <div
              className={styles.iconBox}
              style={{
                background: gradient,
              }}
            >
              {icon}
            </div>
          </motion.div>

          <div className={styles.contentWrapper}>
            <h2
              className={styles.title}
              style={{
                backgroundImage: gradient,
              }}
            >
              {title}
            </h2>
            <p className={styles.subtitle}>
              {subtitle}
            </p>
            <span className={styles.badge}>
              🚧 Wiki Section Work In Progress
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function MoveDex() {
  return (
    <BasePlaceholderDex
      title="Move Dex"
      subtitle="Explore and search all learnable attacks, detailed power metrics, accuracy, and elemental effects."
      icon={<Zap size={45} />}
      gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    />
  );
}

export function AbilityDex() {
  return (
    <BasePlaceholderDex
      title="Ability Dex"
      subtitle="Examine unique battle passive traits, hidden capabilities, and competitive strategic effects."
      icon={<Brain size={45} />}
      gradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    />
  );
}

export function ItemDex() {
  return (
    <BasePlaceholderDex
      title="Item Dex"
      subtitle="Search holdable battle items, evolutionary stones, key items, and restoration resources."
      icon={<Backpack size={45} />}
      gradient="linear-gradient(135deg, #10b981 0%, #047857 100%)"
    />
  );
}

export function LocationDex() {
  return (
    <BasePlaceholderDex
      title="Location Dex"
      subtitle="Map out region habitats, wilderness encounter zones, routes, and wild Pokemon spawn rates."
      icon={<Map size={45} />}
      gradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
    />
  );
}

export function TypeDex() {
  return (
    <BasePlaceholderDex
      title="Type Dex"
      subtitle="Analyze elemental type-matchups, weakness charts, immunity rules, and STAB bonuses."
      icon={<Layers size={45} />}
      gradient="linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)"
    />
  );
}

export function NatureDex() {
  return (
    <BasePlaceholderDex
      title="Nature Dex"
      subtitle="Examine stat multiplier growth curves, positive/negative stat pairs, and flavor preferences."
      icon={<Compass size={45} />}
      gradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
    />
  );
}
