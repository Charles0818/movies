import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { TranslatorService } from './translator.service';
@Injectable()
export class MoviesService {
  private BASEURL = 'https://swapi.py4e.com/api';
  constructor(
    private readonly httpService: HttpService,
    private readonly translatorService: TranslatorService,
  ) {}
  async getMovies() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.BASEURL}/films`),
      );
      const movies = await this.translatorService.transformMovies(
        response.data.results,
      );
      return movies;
    } catch (error) {
      throw new BadRequestException('Unable to fetch star war movies');
    }
  }

  async getMovie(id: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.BASEURL}/films/${id}`),
      );
      const movie = await this.translatorService.transformMovie(response.data);
      return movie;
    } catch (error) {
      throw new BadRequestException('Unable to fetch the requested movie');
    }
  }

  async getMovieComments() {
    // TODO
  }

  async postComment() {
    // TODO
  }

  async getMovieCharacters() {
    // TODO
  }
}
