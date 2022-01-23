import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './controllers/movies.controller';
import { TransformationService } from './services/transformation.service';
import { CommentsService } from './services/comments.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './repositories/comment.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([CommentRepository])],
  providers: [MoviesService, TransformationService, CommentsService],
  controllers: [MoviesController],
})
export class MoviesModule {}
