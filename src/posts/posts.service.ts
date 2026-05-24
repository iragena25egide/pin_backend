import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../entities/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {}

  private normalizeCategory(category: any): string[] {
    if (!category) return [];
    if (Array.isArray(category)) {
      return category.map(c => typeof c === 'string' ? c.trim() : c).filter(Boolean);
    }
    if (typeof category === 'string') {
      return category.split(',').map(c => c.trim()).filter(Boolean);
    }
    return [];
  }

  async create(createDto: CreatePostDto): Promise<Post> {
    const normalized = {
      ...createDto,
      category: this.normalizeCategory(createDto.category),
    };
    const item = this.repo.create(normalized);
    return this.repo.save(item);
  }

  async findAll(category?: string): Promise<Post[]> {
    if (category) {
      return this.repo.createQueryBuilder("post")
        .where("post.category ILIKE :category", { category: `%${category}%` })
        .orderBy("post.created_at", "DESC")
        .getMany();
    }
    return this.repo.find({
      order: {
        created_at: "DESC"
      }
    });
  }

  async findOne(id: number): Promise<Post> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("Post with ID " + id + " not found");
    }
    return item;
  }

  async findBySlug(slug: string): Promise<Post> {
    const item = await this.repo.findOneBy({ slug });
    if (!item) {
      throw new NotFoundException("Post with slug " + slug + " not found");
    }
    return item;
  }

  async update(id: number, updateDto: UpdatePostDto): Promise<Post> {
    const item = await this.findOne(id);
    const normalized = {
      ...updateDto,
      category: updateDto.category !== undefined ? this.normalizeCategory(updateDto.category) : undefined,
    };
    const updated = this.repo.merge(item, normalized);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }

  async search(query: string): Promise<Post[]> {
    if (!query) return [];
    return this.repo.createQueryBuilder("post")
      .where("post.title ILIKE :query", { query: `%${query}%` })
      .orWhere("post.content ILIKE :query", { query: `%${query}%` })
      .orderBy("post.created_at", "DESC")
      .getMany();
  }
}
