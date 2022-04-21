import { fetcher,  } from '@/lib/fetch';
import useSWR from 'swr';

export function useCurrentUser() {
  return useSWR('/api/user', fetcher);
}

export function useUser(id) {
  const { data, error } = useSWR(`/api/users/${id}`, fetcher);

  return {
    user : data && data.user  && data.user || {},
    isLoading: !error && !data,
    isError: error
  }
}


export function useUsers() {
    const { data, error } = useSWR('/api/users', fetcher);

    return {
        users : data && data.users  && data.users || [],
        isLoading: !error && !data,
        isError: error
      }
  }
