import { VideosService } from "./videos.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
export declare class VideosController {
    private readonly service;
    constructor(service: VideosService);
    create(createDto: CreateVideoDto): Promise<import("../entities/video.entity").Video>;
    findAll(): Promise<import("../entities/video.entity").Video[]>;
    findOne(id: string): Promise<import("../entities/video.entity").Video>;
    findBySlug(slug: string): Promise<import("../entities/video.entity").Video>;
    update(id: string, updateDto: UpdateVideoDto): Promise<import("../entities/video.entity").Video>;
    remove(id: string): Promise<void>;
    syncYouTube(): Promise<{
        message: string;
        count: number;
    }>;
}
