import { Repository } from 'typeorm';
import { AnalyticsEvent } from '../entities/analytics-event.entity';
export declare class AnalyticsService {
    private readonly analyticsRepository;
    constructor(analyticsRepository: Repository<AnalyticsEvent>);
    trackEvent(data: Partial<AnalyticsEvent>): Promise<AnalyticsEvent>;
    getDashboardStats(): Promise<any>;
}
