import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsEvent } from '../entities/analytics-event.entity';
import { Post } from '../entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsEvent, Post])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
