import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { UserModule } from 'src/user/user.module';
import { Answer } from 'src/exam-forms/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, Answer]), UserModule],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService]
})
export class ExamsModule {}
