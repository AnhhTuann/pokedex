import React from 'react';
import { Box, Container, Typography, Card, alpha, useTheme } from '@mui/material';
import { motion } from 'motion/react';
import {
  FlashOn, Psychology, Backpack, Map, Category, SelfImprovement
} from '@mui/icons-material';

interface PlaceholderDexProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
}

function BasePlaceholderDex({ title, subtitle, icon, gradient }: PlaceholderDexProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: '24px',
            background: isDark
              ? `linear-gradient(135deg, ${alpha('#1e1b4b', 0.6)} 0%, ${alpha('#0f0f1a', 0.9)} 100%)`
              : `linear-gradient(135deg, ${alpha('#f1f5f9', 0.9)} 0%, ${alpha('#ffffff', 0.95)} 100%)`,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 3,
          }}
        >
          {/* Background decorative glow */}
          <Box
            sx={{
              position: 'absolute',
              top: '-10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: gradient,
              filter: 'blur(100px)',
              opacity: isDark ? 0.25 : 0.12,
              pointerEvents: 'none',
              zIndex: 0,
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
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: '22px',
                background: gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: `0 12px 36px ${alpha('#6366f1', 0.4)}`,
              }}
            >
              {icon}
            </Box>
          </motion.div>

          <Box sx={{ zIndex: 1, maxWidth: 600 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 950,
                letterSpacing: '-1px',
                textTransform: 'uppercase',
                mb: 1.5,
                background: gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontWeight: 600, letterSpacing: '0.5px', mb: 3 }}
            >
              {subtitle}
            </Typography>
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                px: 2.5,
                py: 1,
                borderRadius: '50px',
                display: 'inline-block',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
              }}
            >
              🚧 Wiki Section Work In Progress
            </Typography>
          </Box>
        </Card>
      </motion.div>
    </Container>
  );
}

export function MoveDex() {
  return (
    <BasePlaceholderDex
      title="Move Dex"
      subtitle="Explore and search all learnable attacks, detailed power metrics, accuracy, and elemental effects."
      icon={<FlashOn sx={{ fontSize: 45 }} />}
      gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    />
  );
}

export function AbilityDex() {
  return (
    <BasePlaceholderDex
      title="Ability Dex"
      subtitle="Examine unique battle passive traits, hidden capabilities, and competitive strategic effects."
      icon={<Psychology sx={{ fontSize: 45 }} />}
      gradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    />
  );
}

export function ItemDex() {
  return (
    <BasePlaceholderDex
      title="Item Dex"
      subtitle="Search holdable battle items, evolutionary stones, key items, and restoration resources."
      icon={<Backpack sx={{ fontSize: 45 }} />}
      gradient="linear-gradient(135deg, #10b981 0%, #047857 100%)"
    />
  );
}

export function LocationDex() {
  return (
    <BasePlaceholderDex
      title="Location Dex"
      subtitle="Map out region habitats, wilderness encounter zones, routes, and wild Pokemon spawn rates."
      icon={<Map sx={{ fontSize: 45 }} />}
      gradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
    />
  );
}

export function TypeDex() {
  return (
    <BasePlaceholderDex
      title="Type Dex"
      subtitle="Analyze elemental type-matchups, weakness charts, immunity rules, and STAB bonuses."
      icon={<Category sx={{ fontSize: 45 }} />}
      gradient="linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)"
    />
  );
}

export function NatureDex() {
  return (
    <BasePlaceholderDex
      title="Nature Dex"
      subtitle="Examine stat multiplier growth curves, positive/negative stat pairs, and flavor preferences."
      icon={<SelfImprovement sx={{ fontSize: 45 }} />}
      gradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
    />
  );
}
