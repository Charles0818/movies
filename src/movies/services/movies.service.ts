import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { TransformationService } from './transformation.service';
import { CommentsService } from './comments.service';
import { CommentDto } from '../dto/comment.dto';
import { SuccessResponse } from 'src/utilities/succcessResponse';
import { ICharacter } from 'src/interfaces/character.interface';
import { CharacterQueryDto } from '../dto/CharacterQuery.dto';
@Injectable()
export class MoviesService {
  private BASEURL = 'https://swapi.py4e.com/api';
  constructor(
    private readonly httpService: HttpService,
    private readonly transformation: TransformationService,
    private readonly commentsService: CommentsService,
  ) {}
  async getMovies() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.BASEURL}/films`),
      );
      const movies = await this.transformation.transformMovies(
        response.data.results,
      );
      return movies;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Unable to fetch star war movies');
    }
  }

  async getMovie(id: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.BASEURL}/films/${id}`),
      );
      const movie = await this.transformation.transformMovie(response.data);
      return movie;
    } catch (error) {
      throw new BadRequestException('Unable to fetch the requested movie');
    }
  }

  async getMovieComments(movieId: string) {
    try {
      const { comments, count } = await this.commentsService.getComments(
        movieId,
      );
      return new SuccessResponse(
        { comments, count },
        'Movie comments fetched successfully',
      );
    } catch (error) {
      throw new BadRequestException('Unable to get movie comments');
    }
  }

  async postComment(
    body: CommentDto & { ip_address: string; movieId: string },
  ) {
    try {
      const comment = await this.commentsService.postComment(body);
      return new SuccessResponse({ comment }, 'Comment posted successfully');
    } catch (error) {
      throw new BadRequestException('Unable to post comment');
    }
  }

  async getMovieCharacters(movieId: string, query?: CharacterQueryDto) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.BASEURL}/films/${movieId}`),
      );
      let characters: ICharacter[] = await Promise.all(
        response.data.characters.map(async (character: string) => {
          const response = await lastValueFrom(
            this.httpService.get(`${character}`),
          );
          return this.transformation.transformMovieCharacter(response.data);
        }),
      );

      if (query.filter) {
        characters = characters.filter(
          (character) => character.gender === query.filter,
        );
      }

      if (query.sort) {
        characters = this.transformation.sortCharacters(characters, query);
      }

      const metadata =
        this.transformation.generateCharacterMetadata(characters);
      return new SuccessResponse(
        {
          characters,
          metadata,
        },
        'Movie characters fetched successfully',
      );
    } catch (error) {
      throw new BadRequestException('Unable to fetch movie characters');
    }
  }
}
