import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateExamDto {
  @ApiProperty({
    example: 'Final Exam - Computer Science',
    description: 'The updated title for the exam. This field is optional.',
    required: false
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'This is the final exam for the Computer Science course, covering chapters 1 to 10.',
    description: 'The updated description of the exam. This field is optional.',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2024-12-01T09:00:00Z',
    description: 'The updated start date and time for the exam, in ISO format (UTC). This field is optional.',
    required: false
  })
  @IsOptional()
  @IsDate()
  startTime?: Date;

  @ApiProperty({
    example: '2024-12-01T12:00:00Z',
    description: 'The updated end date and time for the exam, in ISO format (UTC). This field is optional.',
    required: false
  })
  @IsOptional()
  @IsDate()
  endTime?: Date;
}
