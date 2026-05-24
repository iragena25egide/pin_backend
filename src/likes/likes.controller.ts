import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('toggle')
  toggleLike(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.toggleLike(createLikeDto);
  }

  @Get('count')
  getLikeCount(
    @Query('post_id') post_id?: string,
    @Query('video_id') video_id?: string,
    @Query('comment_id') comment_id?: string,
    @Query('user_id') user_id?: string,
  ) {
    return this.likesService.getLikeCount(
      post_id ? +post_id : undefined,
      video_id ? +video_id : undefined,
      comment_id ? +comment_id : undefined,
      user_id,
    );
  }
}
