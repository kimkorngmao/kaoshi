import { Test, TestingModule } from '@nestjs/testing';
import { ExamFormsService } from './exam-forms.service';

describe('ExamFormsService', () => {
  let service: ExamFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamFormsService],
    }).compile();

    service = module.get<ExamFormsService>(ExamFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
