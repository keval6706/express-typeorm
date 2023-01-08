const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next))
    .then(({ message, data, ...rest }) => {
      res.json({ success: true, message, data, ...rest });
    })
    .catch(next);
export default asyncHandler;
