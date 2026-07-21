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
let AnalyticsService = class AnalyticsService {
    constructor(analyticsRepository) {
        this.analyticsRepository = analyticsRepository;
    }
    async trackEvent(data) {
        const event = this.analyticsRepository.create(data);
        return this.analyticsRepository.save(event);
    }
    async getDashboardStats() {
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
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(analytics_event_entity_1.AnalyticsEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map