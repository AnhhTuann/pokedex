import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import { useAuthStore } from '../lib/authStore';
import styles from '../styles/pages/PokemonDex.module.scss';
import cardStyles from '../styles/components/common/Card.module.scss';
import buttonStyles from '../styles/components/common/Button.module.scss';
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
  const client = useApolloClient();

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
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome, {user.username}!</h1>
          <p style={{ opacity: 0.8 }}>Manage your Pokémon journey here.</p>
        </div>
        <button 
          className={`${buttonStyles.button} ${buttonStyles.danger || ''}`} 
          onClick={() => { logout(); client.clearStore(); navigate('/'); }}
        >
          Logout
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading dashboard data...</div>
      ) : error ? (
        <div style={{ color: '#ef4444' }}>Error loading dashboard: {error.message}</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className={cardStyles.card} style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>My Team</h2>
            {data?.myTeam?.length > 0 ? (
              <div className={styles.pokemonGrid} style={{ marginTop: '1rem' }}>
                {data.myTeam.map((p: any, idx: number) => (
                  <PokeCard 
                    key={p.id} 
                    pokemon={p} 
                    index={idx}
                    onClick={() => navigate(`/pokemon/${p.id}`)}
                  />
                ))}
              </div>
            ) : (
              <p style={{ opacity: 0.8, fontStyle: 'italic' }}>You haven't built a team yet. Go to the Team Builder to get started!</p>
            )}
          </section>

          <section className={cardStyles.card} style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>My Favorites (Count)</h2>
            <p style={{ fontSize: '1.25rem' }}>
              You have <strong style={{ color: 'var(--color-primary)' }}>{data?.myFavorites?.length || 0}</strong> favorite Pokémon.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
