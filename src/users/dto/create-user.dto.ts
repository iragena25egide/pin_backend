import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail } from "class-validator";
export class CreateUserDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() password?: string;
  @IsOptional() @IsString() role?: string;
}