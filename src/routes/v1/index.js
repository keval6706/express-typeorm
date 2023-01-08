import express from 'express';
import helthCheckRoutes from './helthCheckRoutes';
import authRoutes from './authRoutes';

const routerV1 = express.Router();

const allRoutes = [
  {
    path: '/',
    route: helthCheckRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

allRoutes.forEach((route) => {
  routerV1.use(route.path, route.route);
});

export default routerV1;
