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
    async create(createDto) {
        const normalized = {
            ...createDto,
            category: this.normalizeCategory(createDto.category),
        };
        const item = this.repo.create(normalized);
        return this.repo.save(item);
    }
    async findAll(category) {
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
    async findOne(id) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException("Post with ID " + id + " not found");
        }
        return item;
    }
    async findBySlug(slug) {
        const item = await this.repo.findOneBy({ slug });
        if (!item) {
            throw new common_1.NotFoundException("Post with slug " + slug + " not found");
        }
        return item;
    }
    async update(id, updateDto) {
        const item = await this.findOne(id);
        const normalized = {
            ...updateDto,
            category: updateDto.category !== undefined ? this.normalizeCategory(updateDto.category) : undefined,
        };
        const updated = this.repo.merge(item, normalized);
        return this.repo.save(updated);
    }
    async remove(id) {
        const item = await this.findOne(id);
        await this.repo.remove(item);
    }
    async search(query) {
        if (!query)
            return [];
        return this.repo.createQueryBuilder("post")
            .where("post.title ILIKE :query", { query: `%${query}%` })
            .orWhere("post.content ILIKE :query", { query: `%${query}%` })
            .orderBy("post.created_at", "DESC")
            .getMany();
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map