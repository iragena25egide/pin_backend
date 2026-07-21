"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../entities/post.entity");
let PostsService = class PostsService {
    constructor(repo) {
        this.repo = repo;
    }
    normalizeCategory(category) {
        if (!category)
            return [];
        if (Array.isArray(category)) {
            return category.map(c => typeof c === 'string' ? c.trim() : c).filter(Boolean);
        }
        if (typeof category === 'string') {
            return category.split(',').map(c => c.trim()).filter(Boolean);
        }
        return [];
    }
    detectLanguage(title, content) {
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
    processPostLanguage(post) {
        if (!post)
            return post;
        let lang = 'rw';
        if (post.category && Array.isArray(post.category)) {
            const enIndex = post.category.indexOf('lang:en');
            const rwIndex = post.category.indexOf('lang:rw');
            if (enIndex !== -1) {
                lang = 'en';
            }
            else if (rwIndex !== -1) {
                lang = 'rw';
            }
            post.category = post.category.filter(c => c !== 'lang:en' && c !== 'lang:rw');
        }
        post.language = lang;
        return post;
    }
    async create(createDto) {
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
    async findAll(category, language) {
        const queryBuilder = this.repo.createQueryBuilder("post");
        if (category) {
            queryBuilder.andWhere("post.category ILIKE :category", { category: `%${category}%` });
        }
        if (language) {
            if (language === 'en') {
                queryBuilder.andWhere("post.category LIKE :langPattern", { langPattern: '%lang:en%' });
            }
            else if (language === 'rw') {
                queryBuilder.andWhere("(post.category NOT LIKE :langPattern OR post.category IS NULL)", { langPattern: '%lang:en%' });
            }
        }
        const posts = await queryBuilder
            .orderBy("post.created_at", "DESC")
            .getMany();
        return posts.map(post => this.processPostLanguage(post));
    }
    async findOne(id) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException("Post with ID " + id + " not found");
        }
        return this.processPostLanguage(item);
    }
    async findBySlug(slug) {
        const item = await this.repo.findOneBy({ slug });
        if (!item) {
            throw new common_1.NotFoundException("Post with slug " + slug + " not found");
        }
        return this.processPostLanguage(item);
    }
    async update(id, updateDto) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException("Post with ID " + id + " not found");
        }
        let lang = updateDto.language;
        if (!lang) {
            const processedExisting = this.processPostLanguage({ ...item });
            lang = processedExisting.language;
        }
        let updatedCategories = undefined;
        if (updateDto.category !== undefined) {
            const categoryArray = this.normalizeCategory(updateDto.category);
            updatedCategories = categoryArray.filter(c => c !== 'lang:en' && c !== 'lang:rw');
            updatedCategories.push(`lang:${lang}`);
        }
        else if (updateDto.language !== undefined) {
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
    async remove(id) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException("Post with ID " + id + " not found");
        }
        await this.repo.remove(item);
    }
    async search(query) {
        if (!query)
            return [];
        const posts = await this.repo.createQueryBuilder("post")
            .where("post.title ILIKE :query", { query: `%${query}%` })
            .orWhere("post.content ILIKE :query", { query: `%${query}%` })
            .orderBy("post.created_at", "DESC")
            .getMany();
        return posts.map(post => this.processPostLanguage(post));
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map