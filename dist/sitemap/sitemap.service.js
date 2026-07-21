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
exports.SitemapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../entities/post.entity");
const video_entity_1 = require("../entities/video.entity");
let SitemapService = class SitemapService {
    constructor(postRepository, videoRepository) {
        this.postRepository = postRepository;
        this.videoRepository = videoRepository;
    }
    async generateSitemap() {
        const baseUrl = 'https://pinrwanda.com';
        const staticPages = [
            { url: `${baseUrl}/rw`, priority: '1.0', changefreq: 'daily' },
            { url: `${baseUrl}/rw/amashusho`, priority: '0.8', changefreq: 'daily' },
        ];
        const categories = [
            'amakuru',
            'ubutabera',
            'imikino',
            'imyidagaduro',
            'amahanga',
            'ibidukikije',
            'ibikunzwe',
            'mine-na-kariyeri',
            'utuntu-n-undi',
            'ubukungu',
            'ubuzima',
            'uburezi',
        ];
        const categoryPages = categories.map((category) => ({
            url: `${baseUrl}/rw/category/${category}`,
            priority: '0.8',
            changefreq: 'daily',
        }));
        const posts = await this.postRepository.find({
            order: { created_at: 'DESC' },
            take: 5000,
        });
        const postPages = posts.map((post) => ({
            url: `${baseUrl}/rw/post/${post.slug}`,
            lastmod: post.created_at,
            priority: '0.7',
            changefreq: 'weekly',
        }));
        const videos = await this.videoRepository.find({
            order: { created_at: 'DESC' },
            take: 5000,
        });
        const videoPages = videos.map((video) => ({
            url: `${baseUrl}/rw/video/${video.slug}`,
            lastmod: video.created_at,
            priority: '0.7',
            changefreq: 'weekly',
        }));
        const allPages = [
            ...staticPages,
            ...categoryPages,
            ...postPages,
            ...videoPages,
        ];
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        for (const page of allPages) {
            xml += '  <url>\n';
            xml += `    <loc>${this.escapeXml(page.url)}</loc>\n`;
            if (page.lastmod) {
                const lastmod = new Date(page.lastmod).toISOString().split('T')[0];
                xml += `    <lastmod>${lastmod}</lastmod>\n`;
            }
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += '  </url>\n';
        }
        xml += '</urlset>';
        return xml;
    }
    async generateRobotsTxt() {
        const baseUrl = 'https://pinrwanda.com';
        let robotsTxt = 'User-agent: *\n';
        robotsTxt += 'Allow: /\n\n';
        robotsTxt += 'Disallow: /rw/admin\n';
        robotsTxt += 'Disallow: /api/\n';
        robotsTxt += 'Disallow: /uploads/\n\n';
        robotsTxt += `Sitemap: ${baseUrl}/sitemap.xml\n`;
        return robotsTxt;
    }
    escapeXml(unsafe) {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
};
exports.SitemapService = SitemapService;
exports.SitemapService = SitemapService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SitemapService);
//# sourceMappingURL=sitemap.service.js.map