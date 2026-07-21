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
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_entity_1 = require("../entities/video.entity");
let VideosService = class VideosService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(createDto) {
        const item = this.repo.create(createDto);
        return this.repo.save(item);
    }
    findAll() {
        return this.repo.find({
            order: {
                created_at: 'DESC'
            }
        });
    }
    async findOne(id) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException("Video with ID " + id + " not found");
        }
        return item;
    }
    async findBySlug(slug) {
        const item = await this.repo.findOneBy({ slug });
        if (!item) {
            throw new common_1.NotFoundException(`Video with slug ${slug} not found`);
        }
        return item;
    }
    async update(id, updateDto) {
        const item = await this.findOne(id);
        const updated = this.repo.merge(item, updateDto);
        return this.repo.save(updated);
    }
    async remove(id) {
        const item = await this.findOne(id);
        await this.repo.remove(item);
    }
    async syncYouTube() {
        const apiKey = process.env.YOUTUBE_API_KEY;
        const channelId = process.env.YOUTUBE_CHANNEL_ID;
        if (!apiKey || !channelId) {
            throw new common_1.BadRequestException("Missing YouTube API credentials in environment variables. Please configure YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID.");
        }
        const axios = require('axios');
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`;
        let addedCount = 0;
        try {
            const response = await axios.get(url);
            const items = response.data.items || [];
            for (const item of items) {
                if (item.id.kind === 'youtube#video') {
                    const videoId = item.id.videoId;
                    const snippet = item.snippet;
                    const existing = await this.repo.findOneBy({ youtube_video_id: videoId });
                    if (!existing) {
                        const slug = snippet.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + videoId;
                        const newVideo = this.repo.create({
                            title: snippet.title,
                            description: snippet.description,
                            youtube_video_id: videoId,
                            slug: slug,
                            thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
                            type: 'youtube',
                            category: 'YouTube Sync',
                            created_at: new Date(snippet.publishedAt)
                        });
                        await this.repo.save(newVideo);
                        addedCount++;
                    }
                }
            }
            return { message: "Sync successful", count: addedCount };
        }
        catch (error) {
            const errorMsg = error.response?.data?.error?.message || error.message;
            console.error("YouTube Sync Error:", error.response?.data || error.message);
            throw new common_1.InternalServerErrorException(`YouTube Sync Failed: ${errorMsg}`);
        }
    }
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VideosService);
//# sourceMappingURL=videos.service.js.map