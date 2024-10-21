import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class EnrollStudentDto {
  @ApiProperty({
    example: 12345,
    description: 'The unique identifier for the student who is being enrolled in the course or exam.'
  })
  @IsNumber()
  @IsNotEmpty()
  studentId: number;
}
