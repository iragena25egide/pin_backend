import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { Announcement } from '../entities/announcement.entity';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  findAll(): Promise<Announcement[]> {
    return this.announcementsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string): Promise<Announcement> {
    return this.announcementsService.findOne(slug);
  }

  @Post()
  create(@Body() announcementData: Partial<Announcement>): Promise<Announcement> {
    return this.announcementsService.create(announcementData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Announcement>): Promise<Announcement> {
    return this.announcementsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.announcementsService.remove(+id);
  }
}
