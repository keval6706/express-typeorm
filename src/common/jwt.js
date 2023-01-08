import jwt from 'jsonwebtoken';
import config from 'config';

export const createJwtToken = (payload) => {
  const jwtSecret = config.get('jwtSecret');
  return jwt.sign(payload, jwtSecret);
};
