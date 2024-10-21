import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user, which must be a valid email format.'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'The unique username for the user. This field must not be empty.'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'strongPassword123!',
    description: 'The password for the user. This field must not be empty and should contain a secure password.'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'student',
    description: 'The role of the user, which can be either "teacher" or "student". This field is optional.',
    required: false
  })
  @IsOptional()
  @IsString()
  role?: string; // Can be 'teacher' or 'student'
}
