import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE', orphanedRowAction: 'delete'
})
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Column()
  postId: number;
}
