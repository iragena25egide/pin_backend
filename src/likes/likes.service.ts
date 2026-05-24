import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { CreateLikeDto } from './create-like.dto';

function parseUserId(userId: any): number | undefined {
  if (userId === undefined || userId === null) return undefined;
  const num = Number(userId);
  if (!isNaN(num)) {
    return num;
  }
  // Otherwise it's a string, let's hash it to a positive integer
  const str = String(userId);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async toggleLike(createLikeDto: CreateLikeDto): Promise<{ status: string }> {
    const { post_id, video_id, comment_id, user_id } = createLikeDto;
    const parsedUser = parseUserId(user_id);

    if (!post_id && !video_id && !comment_id) {
      throw new BadRequestException('Must provide post_id, video_id, or comment_id to like');
    }

    // Attempt to find an existing like by the same user for the same resource
    const existingLike = await this.likesRepository.findOne({
      where: [
        { post_id, user_id: parsedUser },
        { video_id, user_id: parsedUser },
        { comment_id, user_id: parsedUser }
      ].filter(condition => Object.values(condition).every(val => val !== undefined && val !== null)),
    });

    if (existingLike) {
      // Unlike
      await this.likesRepository.remove(existingLike);
      return { status: 'unliked' };
    }

    // Like
    const newLike = this.likesRepository.create({
      post_id,
      video_id,
      comment_id,
      user_id: parsedUser
    });
    await this.likesRepository.save(newLike);
    return { status: 'liked' };
  }

  async getLikeCount(post_id?: number, video_id?: number, comment_id?: number, user_id?: string): Promise<{ count: number; hasLiked: boolean }> {
    const whereCondition: any = {};
    if (post_id) whereCondition.post_id = post_id;
    if (video_id) whereCondition.video_id = video_id;
    if (comment_id) whereCondition.comment_id = comment_id;

    if (Object.keys(whereCondition).length === 0) {
      throw new BadRequestException('Must provide post_id, video_id, or comment_id to count likes');
    }

    const count = await this.likesRepository.count({ where: whereCondition });
    
    let hasLiked = false;
    const parsedUser = parseUserId(user_id);
    if (parsedUser) {
      const userLike = await this.likesRepository.findOne({ where: { ...whereCondition, user_id: parsedUser } });
      if (userLike) hasLiked = true;
    }

    return { count, hasLiked };
  }
}
