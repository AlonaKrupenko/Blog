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

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId' }) // Join the Comment to Post via postId
  post: Post;

  @Column()
  postId: number; // This will store the postId as a foreign key
}

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   ManyToOne,
// } from 'typeorm';
// import { Post } from './post.entity'; // Import Post entity for the relationship

// @Entity()
// export class Comment {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('text')
//   content: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @ManyToOne(() => Post, (post) => post.comments)
//   post: Post; // Establish a many-to-one relationship with Post
// }
