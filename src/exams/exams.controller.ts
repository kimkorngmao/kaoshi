import { Controller, Post, Body, Param, Get, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(
    private examsService: ExamsService
  ) {}

  // Create a new exam (teacher only)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Request() req, @Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto, req.user.userId);
  }

  // Update an existing exam (protected route for teachers)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') examId: number,
    @Body() updateExamDto: UpdateExamDto,
    @Request() req: any
  ) {
    const teacherId = req.user.userId;
    return this.examsService.update(examId, updateExamDto, teacherId);
  }

  // Delete an existing exam (protected route for teachers)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') examId: number, @Request() req: any) {
    const teacherId = req.user.userId;
    return this.examsService.delete(examId, teacherId);
  }

  // Enroll a student in an exam (teacher only)
  @UseGuards(JwtAuthGuard)
  @Post(':examId/enroll')
  async enrollStudent(
    @Request() req,
    @Param('examId') examId: string,
    @Body() enrollStudentDto: EnrollStudentDto,
  ) {
    return this.examsService.enrollStudent(+examId, enrollStudentDto.studentId, req.user.userId);
  }

  // Remove a student from an exam (teacher only)
  @UseGuards(JwtAuthGuard)
  @Delete(':examId/students/:studentId')
  async removeEnrolledStudent(
    @Param('examId') examId: number,
    @Param('studentId') studentId: number,
    @Request() req: any
  ) {
    const teacherId = req.user.userId;
    return this.examsService.removeEnrolledStudent(examId, studentId, teacherId);
  }

  // Get available exams for the logged-in student
  @UseGuards(JwtAuthGuard)
  @Get('available')
  async getAvailableExams(@Request() req) {
    return this.examsService.getAvailableExams(req.user.userId);
  }

  // Get all exams created by the logged-in teacher
  @UseGuards(JwtAuthGuard)
  @Get('teacher')
  async getTeacherExams(@Request() req) {
    return this.examsService.getTeacherExams(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('student-grades')
  async getStudentGrades(@Request() req) {
    return this.examsService.getStudentGrades(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':examId')
  async getExamDetails(@Param('examId') examId: string, @Request() req) {
    return this.examsService.getExamDetails(+examId, req.user.userId);
  }
}
