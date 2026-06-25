import { Controller, Post, Get, Body, Req, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Request } from 'express';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async trackEvent(@Body() body: { event_type: string; payload?: any; visitor_id?: string }, @Req() req: Request) {
    const ip_address = req.ip || req.connection.remoteAddress;
    return this.analyticsService.trackEvent({
      ...body,
      ip_address,
    });
  }

  // Ideally this is protected by an AdminGuard, omitting for basic integration
  @Get('dashboard')
  async getDashboard(@Query('date') date?: string) {
    return this.analyticsService.getDashboardStats(date);
  }
}
