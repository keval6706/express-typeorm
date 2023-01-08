import { checkSchema } from 'express-validator';

export const registerValidations = checkSchema({
  password: {
    notEmpty: { bail: true },
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: { min: 7 },
    },
  },
  fullName: { notEmpty: true },
  email: {
    notEmpty: { bail: true },
    isEmail: {
      bail: true,
    },
  },
});

export const loginValidations = checkSchema({
  password: {
    notEmpty: { bail: true },
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: { min: 7 },
    },
  },
  email: {
    notEmpty: { bail: true },
    isEmail: {
      bail: true,
    },
  },
});
