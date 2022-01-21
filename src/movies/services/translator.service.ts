import { Injectable } from '@nestjs/common';
@Injectable()
export class TranslatorService {
  async transformMovies(movies: any[]) {
    const transformdMovies = await Promise.all(
      movies.map(async (movie) => {
        return {
          id: movie.url.split('films/')[1].charAt(),
          title: movie.title,
          opening_crawl: movie.opening_crawl,
          release_date: movie.release_date,
          comment_count: await this.appendCommentCounts(movie.title),
        };
      }),
    );
    return transformdMovies.sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
    );
  }

  async transformMovie(movie: any) {
    return {
      id: movie.url.split('films/')[1].charAt(),
      title: movie.title,
      opening_crawl: movie.opening_crawl,
      release_date: movie.release_date,
      director: movie.director,
      producer: movie.producer,
      created: movie.created,
      edited: movie.edited,
      comment_count: await this.appendCommentCounts(movie.title),
    };
  }

  async appendCommentCounts(title: string): Promise<number> {
    // TODO: Query Comment Entity and count the number of comments belonging to a particular movie whose title was passed as a parameter
    return 0;
  }
}
