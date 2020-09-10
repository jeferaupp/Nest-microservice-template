import { Module } from '@nestjs/common';
import { ValuesModule } from './values/values.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatedValuesModule } from './related-values/related-values.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ":memory:",
      dropSchema: false,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    ValuesModule,
    RelatedValuesModule
  ]
})
export class AppModule {}
