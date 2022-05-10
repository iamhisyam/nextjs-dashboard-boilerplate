
import { fetcher,  } from '@/lib/fetch';
import useSWR from 'swr';

export function useMenus() {
    const { data, error, mutate } = useSWR(`/api/menus`, fetcher);
    return {
        menus : data && data.menus  && data.menus || [],
        isLoading: !error && !data,
        isError: error,
        mutate
      }
  }