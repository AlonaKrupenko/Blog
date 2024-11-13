import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  // Create a new post
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create(createPostDto);
    return await this.postRepository.save(newPost);
  }

  // Get all posts
  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['comments'], // Add 'comments' to the relations array
    });
  }

  // Get a single post by ID (updated)
  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } }); // Corrected usage
  }

  // Update a post by ID
  async update(id: number, post: Partial<Post>): Promise<Post> {
    await this.postRepository.update(id, post);
    return this.findOne(id);
  }

  // Delete a post by ID
  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
