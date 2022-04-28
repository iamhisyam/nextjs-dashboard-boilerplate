import { fetcher,  } from '@/lib/fetch';
import useSWR from 'swr';

export function useCurrentUser() {
  return useSWR('/api/user', fetcher);
}

export function useUser(id) {
  const { data, error, mutate } = useSWR(`/api/users/${id}`, fetcher);

  return {
    user : data && data.user  && data.user || {},
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}


export function useUsers({pageSize,pageIndex}) {
  
    const startRow = pageSize * pageIndex
   // console.log(pageSize,pageIndex)

    const { data, error, mutate } = useSWR( `/api/users?row=${startRow}&limit=${pageSize}`  , fetcher);

    return {
        data : data && data.users  && data.users || [],
        pageCount: data && data.count && Math.ceil(data.count/pageSize) || 0,
        isLoading: !error && !data,
        isError: error,
        mutate
      }
  }


  export function useUserRoles() {
    const { data, error, mutate } = useSWR('/api/users/roles', fetcher);

    return {
        userRoles : data && data.userRoles  && data.userRoles || [],
        isLoading: !error && !data,
        isError: error,
        mutate
      }
  }
