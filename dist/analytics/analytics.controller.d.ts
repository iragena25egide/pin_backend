import { AnalyticsService } from './analytics.service';
import { Request } from 'express';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    trackEvent(body: {
        event_type: string;
        payload?: any;
        visitor_id?: string;
    }, req: Request): Promise<import("../entities/analytics-event.entity").AnalyticsEvent>;
    getDashboard(date?: string): Promise<any>;
}
