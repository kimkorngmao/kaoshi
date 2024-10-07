import { IsOptional, IsString } from "class-validator";

export class UpdateExamDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    startTime: Date;

    @IsOptional()
    endTime: Date;
}