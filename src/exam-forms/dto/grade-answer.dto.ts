import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class GradeAnswerDto {
  @ApiProperty({
    example: 85,
    description: 'The grade for the answer, ranging from 0 to 100. This should represent the score assigned to the answer.'
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  grade: number; // Grade from 0 to 100
}