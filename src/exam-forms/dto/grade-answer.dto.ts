import { IsNumber, Min, Max } from 'class-validator';

export class GradeAnswerDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  grade: number; // Grade from 0 to 100
}
