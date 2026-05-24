import { IsString, IsOptional, IsBoolean, IsEnum } from "class-validator";
import { AdPosition, AdType } from "../../entities/ad.entity";

export class CreateAdDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() link?: string;
  @IsOptional() @IsString() image_url?: string;
  @IsOptional() @IsString() video_url?: string;
  @IsOptional() @IsEnum(AdPosition) position?: AdPosition;
  @IsOptional() @IsEnum(AdType) type?: AdType;
  @IsOptional() @IsBoolean() is_active?: boolean;
}