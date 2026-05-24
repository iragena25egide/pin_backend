import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail } from "class-validator";
export class CreateContactMessageDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() subject?: string;
  @IsOptional() @IsString() message?: string;
  @IsOptional() @IsBoolean() is_read?: boolean;
}