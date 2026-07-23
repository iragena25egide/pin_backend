"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const analytics_event_entity_1 = require("../entities/analytics-event.entity");
const post_entity_1 = require("../entities/post.entity");
let AnalyticsService = class AnalyticsService {
    constructor(analyticsRepository, postRepository) {
        this.analyticsRepository = analyticsRepository;
        this.postRepository = postRepository;
    }
    async trackEvent(data) {
        const event = this.analyticsRepository.create(data);
        return this.analyticsRepository.save(event);
    }
    async getDashboardStats(dateString) {
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
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(analytics_event_entity_1.AnalyticsEvent)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map