
import { fetcher,  } from '@/lib/fetch';
import useSWR from 'swr';

export function useMenuAuths(userRoleCode) {
    const { data, error } = useSWR(`/api/menuAuths?userRoleCode=${userRoleCode}`, fetcher);
    return {
        menuAuths : data && data.menuAuths  && data.menuAuths || [],
        isLoading: !error && !data,
        isError: error
      }
  }