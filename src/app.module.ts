import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Video } from './entities/video.entity';
import { Comment } from './entities/comment.entity';
import { Ad } from './entities/ad.entity';
import { Like } from './entities/like.entity';
import { Subscriber } from './entities/subscriber.entity';
import { ContactMessage } from './entities/contact-message.entity';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { CommentsModule } from './comments/comments.module';
import { AdsModule } from './ads/ads.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UploadsModule } from './uploads/uploads.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AnalyticsModule } from './analytics/analytics.module';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { Announcement } from "./entities/announcement.entity";
import { join } from 'path';
import { AnnouncementsModule } from './announcements/announcements.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
      retryAttempts: 20, // Wait longer for Railway serverless DB to wake up
      retryDelay: 3000,
    }),
    TypeOrmModule.forFeature([
      User,
      Post,
      Video,
      Comment,
      Ad,
      Like,
      Subscriber,
      ContactMessage,
      AnalyticsEvent,
      Announcement,
    ]),
    PostsModule,
    AuthModule,
    LikesModule,
    UsersModule,
    VideosModule,
    CommentsModule,
    AdsModule,
    ContactMessagesModule,
    SubscribersModule,
    UploadsModule,
    SitemapModule,
    AnalyticsModule,
    AnnouncementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
