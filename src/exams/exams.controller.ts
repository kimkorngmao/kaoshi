import { Controller, Post, Body, Param, Get, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('exams')
@Controller('exams')
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new exam (Teacher only)' })
  @ApiBody({ type: CreateExamDto })
  @ApiResponse({ status: 201, description: 'Exam created successfully' })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Request() req, @Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto, req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing exam (Teacher only)' })
  @ApiBody({ type: UpdateExamDto })
  @ApiResponse({ status: 200, description: 'Exam updated successfully' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') examId: number,
    @Body() updateExamDto: UpdateExamDto,
    @Request() req: any,
  ) {
    const teacherId = req.user.userId;
    return this.examsService.update(examId, updateExamDto, teacherId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an existing exam (Teacher only)' })
  @ApiResponse({ status: 200, description: 'Exam deleted successfully' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') examId: number, @Request() req: any) {
    const teacherId = req.user.userId;
    return this.examsService.delete(examId, teacherId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enroll a student in an exam (Teacher only)' })
  @ApiBody({ type: EnrollStudentDto })
  @ApiResponse({ status: 201, description: 'Student enrolled successfully' })
  @UseGuards(JwtAuthGuard)
  @Post(':examId/enroll')
  async enrollStudent(
    @Request() req,
    @Param('examId') examId: string,
    @Body() enrollStudentDto: EnrollStudentDto,
  ) {
    return this.examsService.enrollStudent(+examId, enrollStudentDto.studentId, req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a student from an exam (Teacher only)' })
  @ApiResponse({ status: 200, description: 'Student removed from the exam successfully' })
  @UseGuards(JwtAuthGuard)
  @Delete(':examId/students/:studentId')
  async removeEnrolledStudent(
    @Param('examId') examId: number,
    @Param('studentId') studentId: number,
    @Request() req: any,
  ) {
    const teacherId = req.user.userId;
    return this.examsService.removeEnrolledStudent(examId, studentId, teacherId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get available exams for the logged-in student' })
  @ApiResponse({ status: 200, description: 'List of available exams retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get('available')
  async getAvailableExams(@Request() req) {
    return this.examsService.getAvailableExams(req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all exams created by the logged-in teacher' })
  @ApiResponse({ status: 200, description: 'List of exams created by the teacher retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get('teacher')
  async getTeacherExams(@Request() req) {
    return this.examsService.getTeacherExams(req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get student grades for the logged-in student' })
  @ApiResponse({ status: 200, description: 'List of grades for the student retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get('student-grades')
  async getStudentGrades(@Request() req) {
    return this.examsService.getStudentGrades(req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get exam details' })
  @ApiResponse({ status: 200, description: 'Exam details retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get(':examId')
  async getExamDetails(@Param('examId') examId: string, @Request() req) {
    return this.examsService.getExamDetails(+examId, req.user.userId);
  }
}
