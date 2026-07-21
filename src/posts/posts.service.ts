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

  private detectLanguage(title: string, content: string): string {
    const rwWords = [
      'umunsi', 'abantu', 'kugira', 'ubucukuzi', 'amabuye', 'yagaciro', 'gaciro', 'rwanda', 'kigali', 'kinyarwanda', 
      'umugore', 'umugabo', 'umwana', 'igihugu', 'amazi', 'umuriro', 'ijambo', 'mu', 'na', 'ku', 'ya', 'wa', 'za', 
      'ko', 'neza', 'rwose', 'hari', 'uri', 'uyu', 'iyo', 'niba', 'kuko', 'kandi', 'ariko', 'kora', 'vuga', 'se',
      'ngo', 'he', 'aho', 'reba'
    ];
    const contentLower = ((title || '') + ' ' + (content || '')).toLowerCase();
    
    let rwCount = 0;
    for (const word of rwWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(contentLower)) {
        rwCount++;
      }
    }
    
    const enWords = ['the', 'and', 'this', 'that', 'with', 'from', 'have', 'been', 'were', 'will', 'would', 'about'];
    let enCount = 0;
    for (const word of enWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(contentLower)) {
        enCount++;
      }
    }

    return rwCount >= enCount ? 'rw' : 'en';
  }

  private processPostLanguage(post: Post): Post {
    if (!post) return post;
    
    let lang = 'rw';
    
    if (post.category && Array.isArray(post.category)) {
      const enIndex = post.category.indexOf('lang:en');
      const rwIndex = post.category.indexOf('lang:rw');
      
      if (enIndex !== -1) {
        lang = 'en';
      } else if (rwIndex !== -1) {
        lang = 'rw';
      }
      
      post.category = post.category.filter(c => c !== 'lang:en' && c !== 'lang:rw');
    }
    
    post.language = lang;
    return post;
  }

  async create(createDto: CreatePostDto): Promise<Post> {
    const lang = createDto.language || this.detectLanguage(createDto.title || '', createDto.content || '');
    const categoryArray = this.normalizeCategory(createDto.category);
    const filteredCategories = categoryArray.filter(c => c !== 'lang:en' && c !== 'lang:rw');
    filteredCategories.push(`lang:${lang}`);

    const normalized = {
      ...createDto,
      category: filteredCategories,
    };
    const item = this.repo.create(normalized);
    const saved = await this.repo.save(item);
    return this.processPostLanguage(saved);
  }

  async findAll(category?: string, language?: string): Promise<Post[]> {
    const queryBuilder = this.repo.createQueryBuilder("post");

    if (category) {
      queryBuilder.andWhere("post.category ILIKE :category", { category: `%${category}%` });
    }

    if (language) {
      if (language === 'en') {
        queryBuilder.andWhere("post.category LIKE :langPattern", { langPattern: '%lang:en%' });
      } else if (language === 'rw') {
        queryBuilder.andWhere("(post.category NOT LIKE :langPattern OR post.category IS NULL)", { langPattern: '%lang:en%' });
      }
    }

    const posts = await queryBuilder
      .select([
        "post.id",
        "post.title",
        "post.slug",
        "post.excerpt",
        "post.author",
        "post.image",
        "post.category",
        "post.views",
        "post.is_sponsored",
        "post.is_featured",
        "post.created_at",
        "post.language"
      ])
      .orderBy("post.created_at", "DESC")
      .getMany();

    return posts.map(post => this.processPostLanguage(post));
  }

  async findOne(id: number): Promise<Post> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("Post with ID " + id + " not found");
    }
    return this.processPostLanguage(item);
  }

  async findBySlug(slug: string): Promise<Post> {
    const item = await this.repo.findOneBy({ slug });
    if (!item) {
      throw new NotFoundException("Post with slug " + slug + " not found");
    }
    // Increment the view count in the database
    await this.repo.increment({ id: item.id }, 'views', 1);
    // Update the local object so the response reflects the new count
    item.views = (item.views || 0) + 1;
    
    return this.processPostLanguage(item);
  }

  async update(id: number, updateDto: UpdatePostDto): Promise<Post> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("Post with ID " + id + " not found");
    }
    
    let lang = updateDto.language;
    if (!lang) {
      const processedExisting = this.processPostLanguage({ ...item } as Post);
      lang = processedExisting.language;
    }

    let updatedCategories: string[] | undefined = undefined;
    if (updateDto.category !== undefined) {
      const categoryArray = this.normalizeCategory(updateDto.category);
      updatedCategories = categoryArray.filter(c => c !== 'lang:en' && c !== 'lang:rw');
      updatedCategories.push(`lang:${lang}`);
    } else if (updateDto.language !== undefined) {
      const categoryArray = this.normalizeCategory(item.category);
      updatedCategories = categoryArray.filter(c => c !== 'lang:en' && c !== 'lang:rw');
      updatedCategories.push(`lang:${lang}`);
    }

    const normalized = {
      ...updateDto,
      category: updatedCategories,
    };
    
    const updated = this.repo.merge(item, normalized);
    const saved = await this.repo.save(updated);
    return this.processPostLanguage(saved);
  }

  async remove(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("Post with ID " + id + " not found");
    }
    await this.repo.remove(item);
  }

  async search(query: string): Promise<Post[]> {
    if (!query) return [];
    const posts = await this.repo.createQueryBuilder("post")
      .select([
        "post.id",
        "post.title",
        "post.slug",
        "post.excerpt",
        "post.author",
        "post.image",
        "post.category",
        "post.views",
        "post.is_sponsored",
        "post.is_featured",
        "post.created_at",
        "post.language"
      ])
      .where("post.title ILIKE :query", { query: `%${query}%` })
      .orWhere("post.content ILIKE :query", { query: `%${query}%` })
      .orderBy("post.created_at", "DESC")
      .getMany();
    return posts.map(post => this.processPostLanguage(post));
  }
}
