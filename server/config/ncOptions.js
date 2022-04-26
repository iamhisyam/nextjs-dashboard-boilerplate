export const ncOptions = {
    onError(err, req, res) {
      res.statusCode =
        err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
      res.json({ success:false,error: err.message });
    },
  };