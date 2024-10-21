import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateExamDto {
  @ApiProperty({
    example: 'Final Exam - Computer Science',
    description: 'The title of the exam. This field must be a descriptive title of the exam.'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is the final exam for the Computer Science course, covering chapters 1 to 10.',
    description: 'A brief description of the exam, outlining what it will cover or any important details.'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2024-12-01T09:00:00Z',
    description: 'The starting date and time for the exam, in ISO format (UTC).'
  })
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @ApiProperty({
    example: '2024-12-01T12:00:00Z',
    description: 'The ending date and time for the exam, in ISO format (UTC).'
  })
  @IsNotEmpty()
  @IsDate()
  endTime: Date;
}
