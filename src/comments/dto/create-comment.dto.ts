import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail } from "class-validator";
export class CreateCommentDto {
  @IsOptional() @IsNumber() post_id?: number;
  @IsOptional() @IsNumber() video_id?: number;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() author_name?: string;
  @IsOptional() @IsEmail() author_email?: string;
  @IsOptional() @IsBoolean() is_approved?: boolean;
}