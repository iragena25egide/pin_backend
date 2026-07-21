"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const data_source_1 = require("./data-source");
const user_entity_1 = require("./entities/user.entity");
const post_entity_1 = require("./entities/post.entity");
const video_entity_1 = require("./entities/video.entity");
const comment_entity_1 = require("./entities/comment.entity");
const ad_entity_1 = require("./entities/ad.entity");
const like_entity_1 = require("./entities/like.entity");
const subscriber_entity_1 = require("./entities/subscriber.entity");
const contact_message_entity_1 = require("./entities/contact-message.entity");
const posts_module_1 = require("./posts/posts.module");
const auth_module_1 = require("./auth/auth.module");
const likes_module_1 = require("./likes/likes.module");
const users_module_1 = require("./users/users.module");
const videos_module_1 = require("./videos/videos.module");
const comments_module_1 = require("./comments/comments.module");
const ads_module_1 = require("./ads/ads.module");
const contact_messages_module_1 = require("./contact-messages/contact-messages.module");
const subscribers_module_1 = require("./subscribers/subscribers.module");
const throttler_1 = require("@nestjs/throttler");
const uploads_module_1 = require("./uploads/uploads.module");
const sitemap_module_1 = require("./sitemap/sitemap.module");
const serve_static_1 = require("@nestjs/serve-static");
const analytics_module_1 = require("./analytics/analytics.module");
const analytics_event_entity_1 = require("./entities/analytics-event.entity");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 10,
                },
            ]),
            typeorm_1.TypeOrmModule.forRoot(data_source_1.AppDataSource.options),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                post_entity_1.Post,
                video_entity_1.Video,
                comment_entity_1.Comment,
                ad_entity_1.Ad,
                like_entity_1.Like,
                subscriber_entity_1.Subscriber,
                contact_message_entity_1.ContactMessage,
                analytics_event_entity_1.AnalyticsEvent,
            ]),
            posts_module_1.PostsModule,
            auth_module_1.AuthModule,
            likes_module_1.LikesModule,
            users_module_1.UsersModule,
            videos_module_1.VideosModule,
            comments_module_1.CommentsModule,
            ads_module_1.AdsModule,
            contact_messages_module_1.ContactMessagesModule,
            subscribers_module_1.SubscribersModule,
            uploads_module_1.UploadsModule,
            sitemap_module_1.SitemapModule,
            analytics_module_1.AnalyticsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map