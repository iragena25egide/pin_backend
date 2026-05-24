import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
export declare class PostsController {
    private readonly service;
    constructor(service: PostsService);
    create(createDto: CreatePostDto): Promise<import("../entities/post.entity").Post>;
    findAll(category?: string): Promise<import("../entities/post.entity").Post[]>;
    findBySlug(slug: string): Promise<import("../entities/post.entity").Post>;
    search(q: string): Promise<import("../entities/post.entity").Post[]>;
    findOne(id: string): Promise<import("../entities/post.entity").Post>;
    update(id: string, updateDto: UpdatePostDto): Promise<import("../entities/post.entity").Post>;
    remove(id: string): Promise<void>;
}
