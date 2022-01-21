import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './controllers/movies.controller';
import { TranslatorService } from './services/translator.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MoviesService, TranslatorService],
  controllers: [MoviesController],
})
export class MoviesModule {}
