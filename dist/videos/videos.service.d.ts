import { Repository } from "typeorm";
import { Video } from "../entities/video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
export declare class VideosService {
    private readonly repo;
    constructor(repo: Repository<Video>);
    create(createDto: CreateVideoDto): Promise<Video>;
    findAll(): Promise<Video[]>;
    findOne(id: number): Promise<Video>;
    findBySlug(slug: string): Promise<Video>;
    update(id: number, updateDto: UpdateVideoDto): Promise<Video>;
    remove(id: number): Promise<void>;
    syncYouTube(): Promise<{
        message: string;
        count: number;
    }>;
}
