import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from '../entities/announcement.entity';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private announcementsRepository: Repository<Announcement>,
  ) {}

  findAll(): Promise<Announcement[]> {
    return this.announcementsRepository.find({ order: { created_at: 'DESC' } });
  }

  findOne(slug: string): Promise<Announcement> {
    return this.announcementsRepository.findOneBy({ slug });
  }

  create(announcementData: Partial<Announcement>): Promise<Announcement> {
    const announcement = this.announcementsRepository.create(announcementData);
    return this.announcementsRepository.save(announcement);
  }

  async update(id: number, updateData: Partial<Announcement>): Promise<Announcement> {
    await this.announcementsRepository.update(id, updateData);
    return this.announcementsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.announcementsRepository.delete(id);
  }
}
