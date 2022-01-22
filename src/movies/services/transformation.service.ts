import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
