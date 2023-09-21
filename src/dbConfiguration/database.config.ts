// src/database/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../rest/user/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'rahul47b',
  password: process.env.DB_PASSWORD || 'dbAdmin1',
  database: process.env.DB_NAME || 'nestdb',
  entities: [User],
  synchronize: process.env.DB_SYNC === 'true' || false,
};
