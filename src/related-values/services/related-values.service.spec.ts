import { Test, TestingModule } from '@nestjs/testing';
import { RelatedValuesService } from './related-values.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RelatedValueEntity } from '../entities/related-value.entity';

describe('RelatedValuesService', () => {
  let service: RelatedValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelatedValuesService,
        {
          provide: getRepositoryToken(RelatedValueEntity),
          useClass: RelatedValueEntity,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<RelatedValuesService>(RelatedValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
