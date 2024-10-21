import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class SubmitAnswerDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the question that the answer is being submitted for. This should be a valid numeric ID from the database.'
  })
  @IsNumber()
  questionId: number;

  @ApiProperty({
    example: 'The smallest unit of information is a bit.',
    description: 'The answer to the question. This can be a text response or a selected option in case of multiple-choice questions.'
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}