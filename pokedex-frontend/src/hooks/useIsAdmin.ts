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

export function useIsAdmin() {
  const token = useAuthStore((state) => state.token);
  const storedIsAdmin = useAuthStore((state) => (state.user as any)?.isAdmin ?? false);

  const { data, loading, error } = useQuery(ME_QUERY, {
    skip: !token,
    fetchPolicy: 'network-only',
  });

  return {
    isAdmin: data?.me?.isAdmin ?? storedIsAdmin,
    loading: Boolean(token) && loading,
    error,
  };
}
