import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useAuthStore } from '../lib/authStore';
import styles from '../styles/pages/PokemonDex.module.scss';
import account from '../styles/pages/Account.module.scss';
import { Button } from '../components/common/Button';
import PokeCard from '../components/PokeCard';

const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    myTeam {
      id
      name
      types
      image
    }
    myFavorites
  }
`;

export default function UserDashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const { data, loading, error } = useQuery(GET_DASHBOARD_DATA, {
    skip: !user,
    fetchPolicy: 'cache-and-network'
  });

  if (!user) return null;

  return (
    <div className={account.dashboard}>
      <header className={account.dashboardHeader}>
        <div>
          <h1>{user.username}</h1>
          <p>Trainer profile</p>
        </div>
        <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>Sign out</Button>
      </header>

      {loading ? (
        <p role="status">Loading trainer profile…</p>
      ) : error ? (
        <p className={account.error} role="alert">Error loading dashboard: {error.message}</p>
      ) : (
        <div className={account.dashboardGrid}>
          <section className={account.dashboardPanel}>
            <div className={account.sectionHeading}>
              <h2>My team</h2>
              <Link to="/teambuilder">Open Team Builder</Link>
            </div>
            {data?.myTeam?.length > 0 ? (
              <div className={styles.pokemonGrid}>
                {data.myTeam.map((p: any, idx: number) => (
                  <PokeCard key={p.id} pokemon={p} index={idx} onClick={() => navigate(`/pokemon/${p.id}`)} />
                ))}
              </div>
            ) : (
              <p>Your team is empty.</p>
            )}
          </section>

          <section className={account.dashboardPanel}>
            <div className={account.sectionHeading}>
              <h2>Favorites</h2>
              <Link to="/">Browse Pokédex</Link>
            </div>
            <p><strong className={account.count}>{data?.myFavorites?.length || 0}</strong> favorite Pokémon</p>
          </section>
        </div>
      )}
    </div>
  );
}
