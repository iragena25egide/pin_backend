import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Video } from '../entities/video.entity';
export declare class SitemapService {
    private postRepository;
    private videoRepository;
    constructor(postRepository: Repository<Post>, videoRepository: Repository<Video>);
    generateSitemap(): Promise<string>;
    generateRobotsTxt(): Promise<string>;
    private escapeXml;
}
