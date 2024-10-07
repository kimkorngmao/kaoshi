import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  type: string; // 'text' or 'multiple-choice'

  @IsArray()
  @IsOptional()
  options?: string[]; // For multiple-choice questions
}
