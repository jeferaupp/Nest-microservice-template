import { Test, TestingModule } from '@nestjs/testing';
import { ValuesService } from './values.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Value } from '../entities/value.entity';

describe('ValuesService', () => {
  let service: ValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValuesService,
        {
          provide: getRepositoryToken(Value),
          useClass: Value,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<ValuesService>(ValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
