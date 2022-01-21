import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from 'src/interfaces/env.interface';
export const ENV_VARIABLES = process.env as any as ENV;

export default registerAs(
  'db',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: ENV_VARIABLES.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  }),
);
