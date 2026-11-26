import { useQuery, gql } from '@apollo/client';
import { useAuthStore } from '../lib/authStore';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      isAdmin
    }
  }
`;

/** Route access requires a fresh server decision for the active token. */
export function useVerifiedSession() {
  const token = useAuthStore(state => state.token);
  const { data, loading, error } = useQuery<{ me: import('../lib/authStore').User | null }>(ME_QUERY, {
    skip: !token,
    fetchPolicy: 'no-cache',
    context: { token },
  });

  return {
    user: token && !loading && !error ? data?.me ?? null : null,
    loading: Boolean(token) && loading,
    error,
    expired: Boolean(token) && !loading && !error && data?.me === null,
  };
}

export function useIsAdmin() {
  const { user, loading, error } = useVerifiedSession();
  return { isAdmin: user?.isAdmin === true, loading, error };
}
