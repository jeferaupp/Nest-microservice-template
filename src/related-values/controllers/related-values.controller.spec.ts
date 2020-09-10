import { Test, TestingModule } from '@nestjs/testing';
import { RelatedValuesController } from './related-values.controller';
import { RelatedValuesService } from '../services/related-values.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RelatedValueEntity } from '../entities/related-value.entity';

describe('RelatedValuesController', () => {
  let controller: RelatedValuesController;
  let service: RelatedValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelatedValuesController],
      providers: [
        RelatedValuesService,
        {
          provide: getRepositoryToken(RelatedValueEntity),
          useClass: RelatedValueEntity
        }
      ]
    }).compile();

    controller = module.get<RelatedValuesController>(RelatedValuesController);
    service = module.get<RelatedValuesService>(RelatedValuesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
