import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class SubmitAnswerDto {
  @IsNumber()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
