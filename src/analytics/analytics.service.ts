import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsEvent } from '../entities/analytics-event.entity';
import { Post } from '../entities/post.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent)
    private readonly analyticsRepository: Repository<AnalyticsEvent>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async trackEvent(data: Partial<AnalyticsEvent>): Promise<AnalyticsEvent> {
    const event = this.analyticsRepository.create(data);
    return this.analyticsRepository.save(event);
  }

  async getDashboardStats(dateString?: string): Promise<any> {
    const targetDate = dateString ? new Date(dateString) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const totalViewsQuery = this.analyticsRepository
      .createQueryBuilder('event')
      .select('COUNT(DISTINCT event.visitor_id)', 'uniqueVisitors')
      .where('event.event_type = :type', { type: 'page_view' })
      .andWhere('event.created_at >= :date', { date: targetDate })
      .andWhere('event.created_at < :nextDate', { nextDate });

    const totalStoryClicksQuery = this.analyticsRepository
      .createQueryBuilder('event')
      .select('COUNT(*)', 'totalClicks')
      .where('event.event_type = :type', { type: 'story_click' })
      .andWhere('event.created_at >= :date', { date: targetDate })
      .andWhere('event.created_at < :nextDate', { nextDate });

    const topPostsQuery = this.postRepository
      .createQueryBuilder('post')
      .select(['post.id', 'post.title', 'post.views'])
      .orderBy('post.views', 'DESC')
      .limit(10);

    const [uniqueVisitorsResult, totalClicksResult, topPosts] = await Promise.all([
      totalViewsQuery.getRawOne(),
      totalStoryClicksQuery.getRawOne(),
      topPostsQuery.getMany(),
    ]);

    return {
      date: targetDate.toISOString().split('T')[0],
      uniqueVisitors: parseInt(uniqueVisitorsResult?.uniqueVisitors || '0', 10),
      totalStoryViews: parseInt(totalClicksResult?.totalClicks || '0', 10),
      topPosts: topPosts || [],
    };
  }
}
