// src/exam-forms/exam-forms.service.ts

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { ExamsService } from 'src/exams/exams.service';
import { GradeAnswerDto } from './dto/grade-answer.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class ExamFormsService {
  constructor(
    @InjectRepository(Question) private questionRepository: Repository<Question>,
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    private examsService: ExamsService
  ) { }

  // Add a question to an exam (teacher only)
  async addQuestion(examId: number, createQuestionDto: CreateQuestionDto, teacherId: number): Promise<Question> {
    const exam = await this.examsService.getTeacherExams(teacherId);
    if (!exam.some(e => e.id === examId)) {
      throw new UnauthorizedException('You are not authorized to add questions to this exam');
    }

    const question = this.questionRepository.create({
      ...createQuestionDto,
      exam: { id: examId } as any,
    });

    return await this.questionRepository.save(question);
  }

  // Submit an answer (student only)
  async submitAnswer(submitAnswerDto: SubmitAnswerDto, studentId: number): Promise<Answer> {
    // Check if the question exists
    const question = await this.questionRepository.findOne({ where: { id: submitAnswerDto.questionId } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    // Ensure the exam is available to the student (optional, based on your security rules)
    const exam = await this.examsService.getAvailableExams(studentId);
    // Uncomment this if you want to enforce the check for available exams
    // if (!exam.some(e => e.id === question.exam.id)) {
    //   throw new UnauthorizedException('You are not authorized to answer this exam');
    // }

    // Check if the student has already submitted an answer for this question
    let existingAnswer = await this.answerRepository.findOne({
      where: {
        student: { id: studentId },
        question: { id: submitAnswerDto.questionId },
      },
    });

    if (existingAnswer) {
      // Update the existing answer
      existingAnswer.answer = submitAnswerDto.answer;
      return await this.answerRepository.save(existingAnswer);
    } else {
      // Create a new answer
      const newAnswer = this.answerRepository.create({
        student: { id: studentId } as User,
        question: { id: submitAnswerDto.questionId } as Question,
        answer: submitAnswerDto.answer,
      });

      return await this.answerRepository.save(newAnswer);
    }
  }

  // Fetch results for a particular exam (Teacher only)
  async getExamResults(examId: number, teacherId: number): Promise<any> {
    // Fetch the exam details for the given teacher
    const exams = await this.examsService.getTeacherExams(teacherId);
    const exam = exams.find(e => e.id === examId);

    if (!exam) {
      throw new UnauthorizedException('You do not have permission to view the results of this exam');
    }

    // Find all questions for the given exam
    const questions = await this.questionRepository.find({
      where: { exam: { id: examId } },
      relations: ['exam'],
    });

    const questionIds = questions.map(q => q.id);

    // Fetch all answers related to the exam's questions using the 'In' operator
    const answers = await this.answerRepository.find({
      where: { question: { id: In(questionIds) } },  // Use 'In' operator here
      relations: ['student', 'question'],
    });

    // Group answers by student and calculate total grade
    const results = answers.reduce((acc, answer) => {
      const studentId = answer.student.id;
      if (!acc[studentId]) {
        acc[studentId] = {
          student: answer.student,
          answers: [],
          totalGrade: 0 // Initialize totalGrade
        };
      }

      // Add answer to student's list of answers
      acc[studentId].answers.push({
        id: answer.id,
        question: answer.question.text,
        answer: answer.answer,
        grade: answer.grade
      });

      // Increment the student's total grade
      acc[studentId].totalGrade += answer.grade || 0; // Handle possible null grades by using `|| 0`

      return acc;
    }, {});

    return results;
  }

  // Fetch the details of a specific question
  async getQuestionDetail(questionId: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    return question;
  }

  // Teacher: Update a question
  async updateQuestion(questionId: number, updateQuestionDto: UpdateQuestionDto, teacherId: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
      relations: ['exam'],
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const teacherExams = await this.examsService.getTeacherExams(teacherId);
    if (!teacherExams.some(e => e.id === question.exam.id)) {
      throw new UnauthorizedException('You are not authorized to update this question');
    }

    // Update the question fields with new values
    Object.assign(question, updateQuestionDto);

    return await this.questionRepository.save(question);
  }

  // Teacher: Delete a question
  async deleteQuestion(questionId: number, teacherId: number): Promise<void> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
      relations: ['exam'],
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const teacherExams = await this.examsService.getTeacherExams(teacherId);
    if (!teacherExams.some(e => e.id === question.exam.id)) {
      throw new UnauthorizedException('You are not authorized to delete this question');
    }

    await this.questionRepository.remove(question);
  }


  // Teacher: Grade an answer
  async gradeAnswer(answerId: number, gradeAnswerDto: GradeAnswerDto, teacherId: number): Promise<Answer> {

    const answer = await this.answerRepository.findOne({
      where: { id: answerId },
      relations: ['question', 'question.exam'],
    });

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    // Ensure the teacher created the exam the question belongs to
    const teacherExams = await this.examsService.getTeacherExams(teacherId);
    if (!teacherExams.some(e => e.id === answer.question.exam.id)) {
      throw new UnauthorizedException('You are not authorized to grade this answer');
    }

    // Update the answer with the new grade
    answer.grade = gradeAnswerDto.grade;
    return await this.answerRepository.save(answer);
  }
}
