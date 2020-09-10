import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuesController } from './controllers/values.controller';
import { ValuesService } from './services/values.service';
import { Value } from './entities/value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Value])],
  providers: [ValuesService],
  controllers: [ValuesController]
})
export class ValuesModule {}
