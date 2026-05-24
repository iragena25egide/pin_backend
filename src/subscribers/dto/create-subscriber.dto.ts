import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail } from "class-validator";
export class CreateSubscriberDto {
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsBoolean() is_active?: boolean;
}