import React, { lazy, Suspense } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useIsAdmin } from './hooks/useIsAdmin';
import MainLayout from './components/MainLayout';

// Re-exported for existing consumers; the values now live in a lean module so
// lazy route chunks do not depend on the router shell.
export {
  VERSION_COLORS,
  GENERATION_VERSIONS,
  GAME_TO_REGIONAL_DEX,
  getGameGeneration,
  getRegionAndGame,
  getVersionDisplayName,
  getVersionColorStyle,
} from './lib/gameVersions';
export type { GameVersionRow, GenerationGroup } from './lib/gameVersions';

const PokemonDex = lazy(() => import('./pages/PokemonDex'));
const LocationDex = lazy(() => import('./pages/LocationDex'));
const TypeDex = lazy(() => import('./pages/TypeDex'));
const MoveDex = lazy(() => import('./pages/MoveDex'));
const AbilityDex = lazy(() => import('./pages/AbilityDex'));
const ItemDex = lazy(() => import('./pages/ItemDex'));
const NatureDex = lazy(() => import('./pages/NatureDex'));
const TeamBuilder = lazy(() => import('./pages/TeamBuilder'));
const CatchTracker = lazy(() => import('./pages/CatchTracker'));
const DamageCalculator = lazy(() => import('./pages/DamageCalculator'));
const Walkthrough = lazy(() => import('./pages/Walkthrough'));
const AdminWalkthrough = lazy(() => import('./pages/AdminWalkthrough'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
    style={{ width: '100%', height: '100%' }}
  >
    {children}
  </motion.div>
);

const routePage = (Page: React.ComponentType) => (
  <PageWrapper>
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading…</div>}>
      <Page />
    </Suspense>
  </PageWrapper>
);

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useIsAdmin();

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang kiểm tra quyền truy cập...</div>;
  }
  if (!isAdmin) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminRoute = () => (
  <RequireAdmin>
    <AdminWalkthrough />
  </RequireAdmin>
);

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={routePage(PokemonDex)} />
          <Route path="/moves" element={routePage(MoveDex)} />
          <Route path="/abilities" element={routePage(AbilityDex)} />
          <Route path="/items" element={routePage(ItemDex)} />
          <Route path="/locations" element={routePage(LocationDex)} />
          <Route path="/types" element={routePage(TypeDex)} />
          <Route path="/natures" element={routePage(NatureDex)} />
          <Route path="/teambuilder" element={routePage(TeamBuilder)} />
          <Route path="/tracker" element={routePage(CatchTracker)} />
          <Route path="/calculator" element={routePage(DamageCalculator)} />
          <Route path="/walkthrough" element={routePage(Walkthrough)} />
          <Route path="/admin/walkthrough" element={routePage(AdminRoute)} />
          <Route path="/login" element={routePage(Login)} />
          <Route path="/register" element={routePage(Register)} />
          <Route path="/dashboard" element={routePage(UserDashboard)} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
