import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsEvent } from '../entities/analytics-event.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent)
    private readonly analyticsRepository: Repository<AnalyticsEvent>,
  ) {}

  async trackEvent(data: Partial<AnalyticsEvent>): Promise<AnalyticsEvent> {
    const event = this.analyticsRepository.create(data);
    return this.analyticsRepository.save(event);
  }

  async getDashboardStats(): Promise<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalViewsQuery = this.analyticsRepository
      .createQueryBuilder('event')
      .select('COUNT(DISTINCT event.visitor_id)', 'uniqueVisitors')
      .where('event.event_type = :type', { type: 'page_view' })
      .andWhere('event.created_at >= :date', { date: today });

    const topStoriesQuery = this.analyticsRepository
      .createQueryBuilder('event')
      .select("event.payload->>'storyId'", 'storyId')
      .addSelect('COUNT(*)', 'clicks')
      .where('event.event_type = :type', { type: 'story_click' })
      .groupBy("event.payload->>'storyId'")
      .orderBy('clicks', 'DESC')
      .limit(10);

    const [uniqueVisitors, topStories] = await Promise.all([
      totalViewsQuery.getRawOne(),
      topStoriesQuery.getRawMany(),
    ]);

    return {
      todayUniqueVisitors: uniqueVisitors?.uniqueVisitors || 0,
      topStories: topStories || [],
    };
  }
}
