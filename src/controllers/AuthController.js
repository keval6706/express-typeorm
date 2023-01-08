import asyncHandler from 'middleware/asyncHandler';
import { dataSource } from 'db/dataSource';
import User from '../db/entities/user.entity';
import bcrypt from 'bcrypt';
import { createJwtToken } from '../common/jwt';

const AuthController = {
  register: asyncHandler(async (req, res, next) => {
    const userRepository = dataSource.getRepository(User);

    const { fullName, email, password } = req.body;
    const user = await userRepository.save({
      fullName,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const { password: _password, ...rest } = user;

    const token = createJwtToken(rest);

    return {
      message: 'User created successfully.',
      data: { ...rest, token },
    };
  }),

  login: asyncHandler(async (req, res, next) => {
    const userRepository = dataSource.getRepository(User);
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      const error = new Error('User not found with this email.');
      error.status = 400;
      return next(error);
    }

    const { password: _password, ...rest } = user;
    const match = await bcrypt.compare(password, _password);
    if (!match) {
      const error = new Error('Please enter valid password.');
      error.status = 400;
      return next(error);
    }
    const token = createJwtToken(rest);
    return {
      message: 'Login successfully.',
      data: { ...rest, token },
    };
  }),
};

export default AuthController;
