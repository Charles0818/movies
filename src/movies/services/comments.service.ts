import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from '../dto/comment.dto';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepo: CommentRepository,
  ) {}
  async getComments(movieId: string) {
    let commentQuery = this.commentRepo.createQueryBuilder('comment');
    commentQuery = commentQuery.andWhere(`comment.movieId = :movieId`, {
      movieId,
    });
    commentQuery = commentQuery.orderBy('comment.createdAt', 'DESC');
    const [comments, count] = await commentQuery.getManyAndCount();

    return { comments, count };
  }

  async postComment(
    body: CommentDto & { ip_address: string; movieId: string },
  ) {
    const comment = await this.commentRepo.save(body);
    return comment;
  }
}
