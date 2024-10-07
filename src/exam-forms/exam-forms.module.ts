import { Module } from '@nestjs/common';
import { ExamFormsService } from './exam-forms.service';
import { ExamFormsController } from './exam-forms.controller';
import { UserModule } from 'src/user/user.module';
import { ExamsModule } from 'src/exams/exams.module';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer]), ExamsModule, UserModule],
  controllers: [ExamFormsController],
  providers: [ExamFormsService]
})
export class ExamFormsModule {}
