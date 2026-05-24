import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail } from "class-validator";
export class CreateVideoDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() video_url?: string;
  @IsOptional() @IsString() youtube_video_id?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsBoolean() is_live?: boolean;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() thumbnail?: string;
  @IsOptional() @IsString() type?: string;
}