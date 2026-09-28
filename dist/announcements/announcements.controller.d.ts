import { AnnouncementsService } from './announcements.service';
import { Announcement } from '../entities/announcement.entity';
export declare class AnnouncementsController {
    private readonly announcementsService;
    constructor(announcementsService: AnnouncementsService);
    findAll(): Promise<Announcement[]>;
    findOne(slug: string): Promise<Announcement | null>;
    create(announcementData: Partial<Announcement>): Promise<Announcement>;
    update(id: string, updateData: Partial<Announcement>): Promise<Announcement | null>;
    remove(id: string): Promise<void>;
}
