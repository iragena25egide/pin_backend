import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitemapController } from './sitemap.controller';
import { SitemapService } from './sitemap.service';
import { Post } from '../entities/post.entity';
import { Video } from '../entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Video])],
  controllers: [SitemapController],
  providers: [SitemapService],
})
export class SitemapModule {}
