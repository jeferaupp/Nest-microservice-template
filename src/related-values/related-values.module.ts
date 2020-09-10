import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatedValueEntity } from './entities/related-value.entity';
import { RelatedValuesService } from './services/related-values.service';
import { RelatedValuesController } from './controllers/related-values.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RelatedValueEntity])],
    providers: [RelatedValuesService],
    controllers: [RelatedValuesController]
})
export class RelatedValuesModule {}
