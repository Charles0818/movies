import { Controller, Get, Param } from '@nestjs/common';
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
}
