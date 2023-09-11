// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './database.config'; // Import your database configuration

@Module({
  imports: [
    ConfigModule.forRoot(), // You can configure environment variables here
    TypeOrmModule.forRoot(databaseConfig), // Use the imported databaseConfig
  ],
})
export class DatabaseModule {}
