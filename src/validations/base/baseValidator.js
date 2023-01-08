import { validationResult } from 'express-validator';

const baseValidator = {
  validator: function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation errors.');
      error.status = 422;
      error.errors = errors.array();
      return next(error);
    }
    next();
  },
};

export default baseValidator;
