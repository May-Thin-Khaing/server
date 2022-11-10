import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    if (process.env.DB_HOST === 'mongo') {
      return {
        type: 'mongodb',
        url: process.env.MONGODB_URL,
        useNewUrlParser: true,
        ssl: true,
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
        useUnifiedTopology: true,
      };
    } else if (process.env.DB_HOST === 'mysql') {
      return {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      };
    }
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
