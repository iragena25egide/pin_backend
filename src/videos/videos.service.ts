import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "../entities/video.entity";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly repo: Repository<Video>,
  ) {}

  async create(createDto: CreateVideoDto): Promise<Video> {
    const item = this.repo.create(createDto);
    return this.repo.save(item);
  }

  findAll(): Promise<Video[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Video> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("Video with ID " + id + " not found");
    }
    return item;
  }

  async findBySlug(slug: string): Promise<Video> {
    const item = await this.repo.findOneBy({ slug });
    if (!item) {
      throw new NotFoundException(`Video with slug ${slug} not found`);
    }
    return item;
  }

  async update(id: number, updateDto: UpdateVideoDto): Promise<Video> {
    const item = await this.findOne(id);
    const updated = this.repo.merge(item, updateDto);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }

  async syncYouTube(): Promise<{ message: string, count: number }> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    
    if (!apiKey || !channelId) {
      throw new Error("Missing YouTube API credentials in environment variables.");
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

          // Check if it already exists
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
              category: 'YouTube Sync'
            });
            await this.repo.save(newVideo);
            addedCount++;
          }
        }
      }
      return { message: "Sync successful", count: addedCount };
    } catch (error) {
      console.error("YouTube Sync Error:", error.response?.data || error.message);
      throw new Error("Failed to sync from YouTube.");
    }
  }
}
