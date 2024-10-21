import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ 
    example: 'What is the smallest unit of information?', 
    description: 'The actual question text that is being asked. This field must contain the content of the question.' 
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    example: 'multiple-choice', 
    description: 'The type of question. It can either be "text" for open-ended questions or "multiple-choice" for questions with a list of answer options.' 
  })
  @IsString()
  @IsNotEmpty()
  type: string; // 'text' or 'multiple-choice'

  @ApiProperty({
    example: "bit, byte, kilobyte", 
    description: 'An optional array of answer options for multiple-choice questions. This field is only used when the question type is "multiple-choice".' 
  })
  @IsArray()
  @IsOptional()
  options?: string[]; // For multiple-choice questions
}
