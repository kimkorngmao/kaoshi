import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UserService } from 'src/user/user.service';
import { Answer } from 'src/exam-forms/entities/answer.entity';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam) private examsRepository: Repository<Exam>,
    @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>,
    private usersService: UserService,
  ) { }

  // Create a new exam (teacher role required)
  async create(createExamDto: CreateExamDto, teacherId: number): Promise<Exam> {
    const teacher = await this.usersService.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      throw new UnauthorizedException('Only teachers can create exams');
    }

    const exam = this.examsRepository.create({
      ...createExamDto,
      startTime: new Date(createExamDto.startTime),
      endTime: new Date(createExamDto.endTime),
      teacher,
    });

    return await this.examsRepository.save(exam);
  }

  // Update an exam (only the teacher who created the exam can update it)
  async update(examId: number, updateExamDto: UpdateExamDto, teacherId: number): Promise<Exam> {
    const exam = await this.examsRepository.findOne({ where: { id: examId }, relations: ['teacher'] });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${examId} not found`);
    }

    if (exam.teacher.id !== teacherId) {
      throw new UnauthorizedException('You can only update exams you created');
    }

    // Update the exam with the new data
    Object.assign(exam, {
      ...updateExamDto,
      startTime: updateExamDto.startTime ? new Date(updateExamDto.startTime) : exam.startTime,
      endTime: updateExamDto.endTime ? new Date(updateExamDto.endTime) : exam.endTime,
    });

    return await this.examsRepository.save(exam);
  }

  // Delete an exam (only the teacher who created the exam can delete it)
  async delete(examId: number, teacherId: number): Promise<void> {
    const exam = await this.examsRepository.findOne({ where: { id: examId }, relations: ['teacher'] });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${examId} not found`);
    }

    if (exam.teacher.id !== teacherId) {
      throw new UnauthorizedException('You can only delete exams you created');
    }

    await this.examsRepository.remove(exam);
  }

  // Enroll a student in an exam
  async enrollStudent(examId: number, studentId: number, userId: number): Promise<Exam> {
    const exam = await this.examsRepository.findOne({ where: { id: examId } });
    const student = await this.usersService.findById(studentId);

    if (!exam) {
      throw new NotFoundException('Exam not found');
    } else if (exam.teacher.id !== userId){
      throw new UnauthorizedException('Only exam author can be enroll students.')
    } else if (!student || student.role !== 'student') {
      throw new UnauthorizedException('Only students can be enrolled');
    }

    exam.enrolledStudents.push(student);
    return await this.examsRepository.save(exam);
  }

  // Remove an enrolled student from an exam (only the teacher who created the exam can do this)
  async removeEnrolledStudent(examId: number, studentId: number, teacherId: number): Promise<Exam> {
    const exam = await this.examsRepository.findOne({ where: { id: examId }, relations: ['teacher', 'enrolledStudents'] });

    if (!exam) {
      throw new NotFoundException(`Exam with ID ${examId} not found`);
    }

    // Check if the current user is the teacher who created the exam
    if (exam.teacher.id !== teacherId) {
      throw new UnauthorizedException('You can only remove students from exams you created');
    }

    // Check if the student is enrolled in the exam
    const studentIndex = exam.enrolledStudents.findIndex(student => Number(student.id) === Number(studentId));
    if (studentIndex === -1) {
      throw new NotFoundException(`Student with ID ${studentId} is not enrolled in this exam`);
    }

    // Remove the student from the enrolled students list
    exam.enrolledStudents.splice(studentIndex, 1);
    
    return await this.examsRepository.save(exam); // Save the updated exam
  }

  // Get exams for a student (check if within time frame)
  async getAvailableExams(studentId: number): Promise<Exam[]> {
    const exams = await this.examsRepository.find({
      where: {
        enrolledStudents: { id: studentId }
      },
    });
    return exams;
  }

  // Get all exams created by a teacher
  async getTeacherExams(teacherId: number): Promise<Exam[]> {
    return this.examsRepository.find({ where: { teacher: { id: teacherId } } });
  } 

  async getExamDetails(examId: number, userId: number): Promise<any> {
    const exam = await this.examsRepository.findOne({
      where: { id: examId },
      relations: ['questions', 'teacher', 'enrolledStudents'],
    });
  
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${examId} not found`);
    }
  
    const user = await this.usersService.findById(userId);
  
    // If the user is a student, check if they are enrolled in the exam
    if (user.role === 'student') {
      const isEnrolled = exam.enrolledStudents.some((student) => student.id === userId);
      if (!isEnrolled) {
        throw new UnauthorizedException('You are not enrolled in this exam');
      }
  
      // Get all answers submitted by this student for this exam
      const submittedAnswers = await this.answerRepository.find({
        where: {
          student: { id: userId },
          question: { exam: { id: examId } },
        },
        relations: ['question'], // Load the question to access questionId
      });
  
      // Transform submittedAnswers to include questionId
      const transformedAnswers = submittedAnswers.map((answer) => ({
        id: answer.id,
        questionId: answer.question.id,  // Access the question's id
        answer: answer.answer,
        grade: answer.grade,
      }));
  
      // Allow the student to continue the exam if not all questions are answered
      const totalQuestions = exam.questions.length;
      const answeredQuestions = submittedAnswers.length;
  
      if (answeredQuestions === totalQuestions) {
        throw new BadRequestException('You have already submitted all your answers for this exam');
      }
  
      // Check if the exam is available based on time schedule
      const currentTime = new Date();
      if (currentTime < exam.startTime || currentTime > exam.endTime) {
        throw new UnauthorizedException('The exam is not available at this time');
      }
  
      return { exam, submittedAnswers: transformedAnswers }; // Return both exam details and already submitted answers
    }
  
    // If the user is a teacher, check if they are the exam author
    if (user.role === 'teacher') {
      if (exam.teacher.id !== userId) {
        throw new UnauthorizedException('You are not authorized to view this exam');
      }
    }
  
    return exam;
  }
  

  async getStudentGrades(studentId: number): Promise<any[]> {
    // Check if studentId is a valid number
    if (typeof studentId !== 'number' || isNaN(studentId) || studentId <= 0) {
      throw new BadRequestException('Invalid student ID');
    }
  
    // Fetch exams and related data
    const exams = await this.examsRepository.find({
      relations: ['questions', 'enrolledStudents', 'questions.answers', 'questions.answers.student'],
      where: {
        enrolledStudents: { id: studentId },
      },
    });
  
    // Process each exam
    const results = exams.map(exam => {
      let totalGrade = 0;
      let gradedQuestions = 0;
  
      // Calculate total grade for the exam
      exam.questions.forEach(question => {
        const studentAnswer = question.answers.find(
          answer => answer?.student?.id === studentId
        );
  
        // Only add valid grades
        if (studentAnswer && studentAnswer.grade !== null) {
          totalGrade += studentAnswer.grade;
          gradedQuestions++;
        }
      });
  
      // Calculate the final grade as the average of graded questions
      const finalGrade = gradedQuestions > 0 ? totalGrade : null;
  
      return {
        examId: exam.id,
        examTitle: exam.title,
        finalGrade,
      };
    });
  
    return results;
  }
}
