import { Repository } from 'typeorm';
import { Announcement } from '../entities/announcement.entity';
export declare class AnnouncementsService {
    private announcementsRepository;
    constructor(announcementsRepository: Repository<Announcement>);
    findAll(): Promise<Announcement[]>;
    findOne(slug: string): Promise<Announcement | null>;
    create(announcementData: Partial<Announcement>): Promise<Announcement>;
    update(id: number, updateData: Partial<Announcement>): Promise<Announcement | null>;
    remove(id: number): Promise<void>;
}
