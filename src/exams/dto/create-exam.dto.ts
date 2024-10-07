import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateExamDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  startTime: Date;

  @IsNotEmpty()
  endTime: Date;
}
