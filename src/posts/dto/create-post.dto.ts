import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail } from "class-validator";
export class CreatePostDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() category?: any;
  @IsOptional() @IsBoolean() is_sponsored?: boolean;
  @IsOptional() @IsBoolean() is_featured?: boolean;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() author?: string;
}