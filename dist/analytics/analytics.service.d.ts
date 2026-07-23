import { Repository } from 'typeorm';
import { AnalyticsEvent } from '../entities/analytics-event.entity';
import { Post } from '../entities/post.entity';
export declare class AnalyticsService {
    private readonly analyticsRepository;
    private readonly postRepository;
    constructor(analyticsRepository: Repository<AnalyticsEvent>, postRepository: Repository<Post>);
    trackEvent(data: Partial<AnalyticsEvent>): Promise<AnalyticsEvent>;
    getDashboardStats(dateString?: string): Promise<any>;
}
