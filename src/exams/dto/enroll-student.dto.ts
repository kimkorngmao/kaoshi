import { IsNumber, IsNotEmpty } from 'class-validator';

export class EnrollStudentDto {
    @IsNumber()
    @IsNotEmpty()
    studentId: number;
}
