import { LikesService } from './likes.service';
import { CreateLikeDto } from './create-like.dto';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    toggleLike(createLikeDto: CreateLikeDto): Promise<{
        status: string;
    }>;
    getLikeCount(post_id?: string, video_id?: string, comment_id?: string, user_id?: string): Promise<{
        count: number;
        hasLiked: boolean;
    }>;
}
