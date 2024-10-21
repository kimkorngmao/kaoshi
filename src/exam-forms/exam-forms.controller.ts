import { Controller, Post, Body, Param, Request, UseGuards, Get, Patch, Delete } from '@nestjs/common';
import { ExamFormsService } from './exam-forms.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GradeAnswerDto } from './dto/grade-answer.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('exam-forms')
@Controller('exam-forms')
export class ExamFormsController {
  constructor(private examFormsService: ExamFormsService) {}

  // Teacher: Add a question to an exam
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a question to an exam (Teacher)' })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({ status: 201, description: 'Question added successfully' })
  @UseGuards(JwtAuthGuard)
  @Post('exam/:examId/question')
  async addQuestion(@Request() req, @Param('examId') examId: string, @Body() createQuestionDto: CreateQuestionDto) {
    return this.examFormsService.addQuestion(+examId, createQuestionDto, req.user.userId);
  }

  // Get details of a specific question
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get question details' })
  @ApiResponse({ status: 200, description: 'Question details retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get('questions/:questionId')
  async getQuestionDetail(@Param('questionId') questionId: string) {
    return this.examFormsService.getQuestionDetail(+questionId);
  }

  // Teacher: Update a question in an exam
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a question in an exam (Teacher)' })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({ status: 200, description: 'Question updated successfully' })
  @UseGuards(JwtAuthGuard)
  @Patch('question/:questionId')
  async updateQuestion(
    @Request() req,
    @Param('questionId') questionId: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.examFormsService.updateQuestion(+questionId, updateQuestionDto, req.user.userId);
  }

  // Teacher: Delete a question in an exam
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a question from an exam (Teacher)' })
  @ApiResponse({ status: 200, description: 'Question deleted successfully' })
  @UseGuards(JwtAuthGuard)
  @Delete('question/:questionId')
  async deleteQuestion(@Request() req, @Param('questionId') questionId: string) {
    return this.examFormsService.deleteQuestion(+questionId, req.user.userId);
  }

  // Student: Submit an answer
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit an answer to a question (Student)' })
  @ApiBody({ type: SubmitAnswerDto })
  @ApiResponse({ status: 201, description: 'Answer submitted successfully' })
  @UseGuards(JwtAuthGuard)
  @Post('question/:questionId/submit')
  async submitAnswer(@Request() req, @Param('questionId') questionId: string, @Body() submitAnswerDto: SubmitAnswerDto) {
    return this.examFormsService.submitAnswer({ ...submitAnswerDto, questionId: +questionId }, req.user.userId);
  }

  // Teacher: Get exam results for a specific exam
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get exam results (Teacher)' })
  @ApiResponse({ status: 200, description: 'Exam results retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  @Get('exam/:examId/results')
  async getExamResults(@Request() req, @Param('examId') examId: string) {
    return this.examFormsService.getExamResults(+examId, req.user.userId);
  }

  // Teacher: Grade an answer
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Grade a submitted answer (Teacher)' })
  @ApiBody({ type: GradeAnswerDto })
  @ApiResponse({ status: 200, description: 'Answer graded successfully' })
  @UseGuards(JwtAuthGuard)
  @Patch('answer/:answerId/grade')
  async gradeAnswer(
    @Request() req,
    @Param('answerId') answerId: string,
    @Body() gradeAnswerDto: GradeAnswerDto,
  ) {
    return this.examFormsService.gradeAnswer(+answerId, gradeAnswerDto, req.user.userId);
  }
}
