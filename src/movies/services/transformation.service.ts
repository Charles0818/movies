import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICharacter } from 'src/interfaces/character.interface';
import { CharacterQueryDto, OrderEnum } from '../dto/CharacterQuery.dto';
import { CommentRepository } from '../repositories/comment.repository';
@Injectable()
export class TransformationService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepo: CommentRepository,
  ) {}
  async transformMovies(movies: any[]) {
    const transformdMovies = await Promise.all(
      movies.map(async (movie) => {
        const id = movie.url.split('films/')[1].charAt();
        return {
          id,
          title: movie.title,
          opening_crawl: movie.opening_crawl,
          release_date: movie.release_date,
          comment_count: await this.appendCommentCounts(id),
        };
      }),
    );
    return transformdMovies.sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
    );
  }

  async transformMovie(movie: any) {
    const id = movie.url.split('films/')[1].charAt();
    return {
      id,
      title: movie.title,
      opening_crawl: movie.opening_crawl,
      release_date: movie.release_date,
      director: movie.director,
      producer: movie.producer,
      created: movie.created,
      edited: movie.edited,
      comment_count: await this.appendCommentCounts(id),
    };
  }

  async appendCommentCounts(movieId: string): Promise<number> {
    return (await this.commentRepo.count({ where: { movieId } })) || 0;
  }

  transformMovieCharacter(character: any): ICharacter {
    return {
      name: character.name,
      height: +character.height,
      mass: character.mass,
      hair_color: character.hair_color,
      skin_color: character.skin_color,
      eye_color: character.eye_color,
      birth_year: character.birth_year,
      gender: character.gender,
    };
  }

  sortCharacters(characters: ICharacter[], query: CharacterQueryDto) {
    characters = characters.sort((a, b) => {
      const { order = OrderEnum.ASCENDING } = query;
      const first = order === OrderEnum.ASCENDING ? a : b;
      const second = order === OrderEnum.DESCENDING ? a : b;
      return first[query.sort] < second[query.sort]
        ? -1
        : first[query.sort] > second[query.sort]
        ? 1
        : 0;
    });
    return characters;
  }

  generateCharacterMetadata(characters: ICharacter[]) {
    const CM_TO_FOOT = 30.48;
    const FOOT_TO_INCHES = 12;
    const charactersCount = characters.length;
    const totalCharacterheight = characters.reduce(
      (prev, current) => prev + current.height,
      0,
    );
    const absoluteFoot = totalCharacterheight / CM_TO_FOOT;
    const foot = Math.floor(absoluteFoot);
    const inches = +(absoluteFoot - foot / FOOT_TO_INCHES).toFixed(2);
    const totalHeight = {
      centimeters: totalCharacterheight,
      foot,
      inches,
    };
    return { charactersCount, totalHeight };
  }
}
