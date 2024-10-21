import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({
    example: 'What is the smallest unit of information?',
    description: 'The updated text for the question. This field is optional.',
    required: false
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    example: 'multiple-choice',
    description: 'The updated type of the question, either "text" for open-ended questions or "multiple-choice" for questions with options. This field is optional.',
    required: false
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({
    example: ['bit', 'byte', 'kilobyte'],
    description: 'The updated options for a multiple-choice question. This field is optional and should only be provided for questions of type "multiple-choice".',
    required: false
  })
  @IsOptional()
  options?: string[]; // Optional if the question type is multiple-choice
}
