import { Repository } from "typeorm";
import { Post } from "../entities/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
export declare class PostsService {
    private readonly repo;
    constructor(repo: Repository<Post>);
    private normalizeCategory;
    private detectLanguage;
    private processPostLanguage;
    create(createDto: CreatePostDto): Promise<Post>;
    findAll(category?: string, language?: string): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    findBySlug(slug: string): Promise<Post>;
    update(id: number, updateDto: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<void>;
    search(query: string): Promise<Post[]>;
}
