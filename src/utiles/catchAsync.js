const asyncHandler = (fn, toast) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log('Error:', err);
      toast(err?.response?.data?.message || 'Something went wrong', { type: 'error' });
      next(err); // recommended: forward error
    });
  };
};

export default asyncHandler;
