import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { CreateLikeDto } from './create-like.dto';
export declare class LikesService {
    private likesRepository;
    constructor(likesRepository: Repository<Like>);
    toggleLike(createLikeDto: CreateLikeDto): Promise<{
        status: string;
    }>;
    getLikeCount(post_id?: number, video_id?: number, comment_id?: number, user_id?: string): Promise<{
        count: number;
        hasLiked: boolean;
    }>;
}
