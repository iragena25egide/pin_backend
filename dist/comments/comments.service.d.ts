import { Repository } from "typeorm";
import { Comment } from "../entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
export declare class CommentsService {
    private readonly repo;
    constructor(repo: Repository<Comment>);
    create(createDto: CreateCommentDto): Promise<Comment>;
    findAll(): Promise<Comment[]>;
    findByPost(postId: number): Promise<Comment[]>;
    findByVideo(videoId: number): Promise<Comment[]>;
    findOne(id: number): Promise<Comment>;
    update(id: number, updateDto: UpdateCommentDto): Promise<Comment>;
    remove(id: number): Promise<void>;
}
