import { IsOptional, IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsOptional()
  @IsNumber()
  post_id?: number;

  @IsOptional()
  @IsNumber()
  video_id?: number;

  @IsOptional()
  @IsNumber()
  comment_id?: number;

  @IsOptional()
  user_id?: any; // Can be a string (guest device ID) or number (authenticated user)
}
