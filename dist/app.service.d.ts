import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Video } from './entities/video.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
export declare class AppService {
    private readonly userRepo;
    private readonly postRepo;
    private readonly videoRepo;
    private readonly commentRepo;
    private readonly likeRepo;
    constructor(userRepo: Repository<User>, postRepo: Repository<Post>, videoRepo: Repository<Video>, commentRepo: Repository<Comment>, likeRepo: Repository<Like>);
    getHello(): string;
    getStats(): Promise<{
        totalUsers: number;
        totalPosts: number;
        totalVideos: number;
        totalComments: number;
        totalOnsiteLikes: number;
        totalYoutubeViews: number;
        totalYoutubeLikes: number;
    }>;
}
