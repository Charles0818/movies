import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],

      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return config.get('db');
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
