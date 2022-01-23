import { Body, Controller, Get, Ip, Param, Post, Query } from '@nestjs/common';
import { CharacterQueryDto } from '../dto/CharacterQuery.dto';
import { CommentDto } from '../dto/comment.dto';
import { MoviesService } from '../services/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('')
  async getMovies() {
    return this.moviesService.getMovies();
  }

  @Get(':id')
  async getAMovie(@Param('id') id: string) {
    return this.moviesService.getMovie(id);
  }

  @Get(':id/comments')
  async getMovieComments(@Param('id') id: string) {
    return this.moviesService.getMovieComments(id);
  }

  @Post(':id/comments')
  async postMovieComment(
    @Param('id') id: string,
    @Ip() ip: string,
    @Body() commentDto: CommentDto,
  ) {
    return this.moviesService.postComment({
      ...commentDto,
      ip_address: ip,
      movieId: id,
    });
  }

  @Get(':id/characters')
  async getMovieCharacters(
    @Param('id') id: string,
    @Query() query: CharacterQueryDto,
  ) {
    return this.moviesService.getMovieCharacters(id, query);
  }
}
