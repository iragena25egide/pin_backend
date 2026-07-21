"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sitemap_controller_1 = require("./sitemap.controller");
const sitemap_service_1 = require("./sitemap.service");
const post_entity_1 = require("../entities/post.entity");
const video_entity_1 = require("../entities/video.entity");
let SitemapModule = class SitemapModule {
};
exports.SitemapModule = SitemapModule;
exports.SitemapModule = SitemapModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([post_entity_1.Post, video_entity_1.Video])],
        controllers: [sitemap_controller_1.SitemapController],
        providers: [sitemap_service_1.SitemapService],
    })
], SitemapModule);
//# sourceMappingURL=sitemap.module.js.map