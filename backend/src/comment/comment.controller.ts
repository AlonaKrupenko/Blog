import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '../entities/comment.entity';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Param('postId') postId: number,
    @Body('content') content: string,
  ): Promise<Comment> {
    return this.commentService.create(postId, content);
  }

  @Get()
  async findByPostId(@Param('postId') postId: number): Promise<Comment[]> {
    return this.commentService.findByPostId(postId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.commentService.delete(id);
  }
}
