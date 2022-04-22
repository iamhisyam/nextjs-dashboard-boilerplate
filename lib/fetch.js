export const fetcher = (...args) => {
    return fetch(...args).then(async (res) => {
      let payload;
      try {
        if (res.status === 204) return null; // 204 does not have body
        payload = await res.json();
      } catch (e) {
        /* noop */
      }
      

      if (res.ok && payload.status==="success") {
        const { data } = payload
        return data;
      } else {
        return Promise.reject('Something went wrong');
      }
    });
  };
  
 