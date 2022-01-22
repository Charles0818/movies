import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class CommentDto {
  @IsString({ message: 'comment must be a string' })
  @IsDefined({ message: "missing field 'comment'" })
  @IsNotEmpty()
  @Length(1, 500, { message: 'comment characters should not exceed 500 max.' })
  comment: string;
}
