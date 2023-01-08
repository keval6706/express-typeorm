import asyncHandler from 'middleware/asyncHandler';

const HomeController = {
  helthCheck: asyncHandler(async (req, res, next) => {
    // const error = new Error('These credentials do not match our records.');
    // error.status = 400;
    // return next(error);
    return res.status(200).json({ success: true });
  }),
};

export default HomeController;
