import { Test, TestingModule } from '@nestjs/testing';
import { ExamFormsController } from './exam-forms.controller';
import { ExamFormsService } from './exam-forms.service';

describe('ExamFormsController', () => {
  let controller: ExamFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamFormsController],
      providers: [ExamFormsService],
    }).compile();

    controller = module.get<ExamFormsController>(ExamFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
