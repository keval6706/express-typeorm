import { DataSource } from 'typeorm';
import config from 'config';

// Entities
import User from './entities/user.entity';

export const dataSource = new DataSource({
  type: config.get('type'),
  host: config.get('host'),
  port: config.get('port'),
  username: config.get('username'),
  password: config.get('password'),
  database: config.get('database'),

  // Make sure disable in Production Env
  synchronize: true,

  // Entities
  entities: [User],
  logging: true,
  autoLoadEntities: true,
});
