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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const like_entity_1 = require("../entities/like.entity");
function parseUserId(userId) {
    if (userId === undefined || userId === null)
        return undefined;
    const num = Number(userId);
    if (!isNaN(num)) {
        return num;
    }
    const str = String(userId);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return Math.abs(hash);
}
let LikesService = class LikesService {
    constructor(likesRepository) {
        this.likesRepository = likesRepository;
    }
    async toggleLike(createLikeDto) {
        const { post_id, video_id, comment_id, user_id } = createLikeDto;
        const parsedUser = parseUserId(user_id);
        if (!post_id && !video_id && !comment_id) {
            throw new common_1.BadRequestException('Must provide post_id, video_id, or comment_id to like');
        }
        const existingLike = await this.likesRepository.findOne({
            where: [
                { post_id, user_id: parsedUser },
                { video_id, user_id: parsedUser },
                { comment_id, user_id: parsedUser }
            ].filter(condition => Object.values(condition).every(val => val !== undefined && val !== null)),
        });
        if (existingLike) {
            await this.likesRepository.remove(existingLike);
            return { status: 'unliked' };
        }
        const newLike = this.likesRepository.create({
            post_id,
            video_id,
            comment_id,
            user_id: parsedUser
        });
        await this.likesRepository.save(newLike);
        return { status: 'liked' };
    }
    async getLikeCount(post_id, video_id, comment_id, user_id) {
        const whereCondition = {};
        if (post_id)
            whereCondition.post_id = post_id;
        if (video_id)
            whereCondition.video_id = video_id;
        if (comment_id)
            whereCondition.comment_id = comment_id;
        if (Object.keys(whereCondition).length === 0) {
            throw new common_1.BadRequestException('Must provide post_id, video_id, or comment_id to count likes');
        }
        const count = await this.likesRepository.count({ where: whereCondition });
        let hasLiked = false;
        const parsedUser = parseUserId(user_id);
        if (parsedUser) {
            const userLike = await this.likesRepository.findOne({ where: { ...whereCondition, user_id: parsedUser } });
            if (userLike)
                hasLiked = true;
        }
        return { count, hasLiked };
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LikesService);
//# sourceMappingURL=likes.service.js.map