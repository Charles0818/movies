import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: '500' })
  comment: string;

  @Column()
  movieId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  ip_address: string;
}
