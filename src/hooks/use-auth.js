import { useCheckAuthQuery } from '../services/authApi';

export const useAuth = () => {
  const { data, isLoading, isError } = useCheckAuthQuery();

  if (isLoading) {
    console.log('Auth check: Loading...');
    return { isAuthenticated: false, isLoading: true };
  }

  if (isError) {
    console.error('Auth check: Error', isError);
    return { isAuthenticated: false, isLoading: false };
  }

  const isAuthenticated =
    data?.status === 'success' &&
    data?.data?.active === true &&
    data?.data?.emailVerified === true;

  console.log('Auth check: Authenticated', isAuthenticated);

  return { isAuthenticated, isLoading: false };
};
