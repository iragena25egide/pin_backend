import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Video } from '../entities/video.entity';

@Injectable()
export class SitemapService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async generateSitemap(): Promise<string> {
    const baseUrl = 'https://pinrwanda.com';
    
    // Static pages
    const staticPages = [
      { url: `${baseUrl}/rw`, priority: '1.0', changefreq: 'daily' },
      { url: `${baseUrl}/rw/amashusho`, priority: '0.8', changefreq: 'daily' },
    ];

    // Categories
    const categories = [
      'amakuru',
      'ubutabera',
      'imikino',
      'imyidagaduro',
      'amahanga',
      'ibidukikije',
      'ibikunzwe',
      'ubucukuzi-bw-amabuye-yagaciro',
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

    // Get all posts
    const posts = await this.postRepository.find({
      order: { created_at: 'DESC' },
      take: 5000, // Limit to prevent huge sitemaps
    });

    const postPages = posts.map((post) => ({
      url: `${baseUrl}/rw/post/${post.slug}`,
      lastmod: post.created_at,
      priority: '0.7',
      changefreq: 'weekly',
    }));

    // Get all videos
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

    // Combine all URLs
    const allPages = [
      ...staticPages,
      ...categoryPages,
      ...postPages,
      ...videoPages,
    ];

    // Generate XML
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

  async generateRobotsTxt(): Promise<string> {
    const baseUrl = 'https://pinrwanda.com';
    
    let robotsTxt = 'User-agent: *\n';
    robotsTxt += 'Allow: /\n\n';
    
    // Disallow admin and API routes
    robotsTxt += 'Disallow: /rw/admin\n';
    robotsTxt += 'Disallow: /api/\n';
    robotsTxt += 'Disallow: /uploads/\n\n';
    
    // Sitemap location
    robotsTxt += `Sitemap: ${baseUrl}/sitemap.xml\n`;
    
    return robotsTxt;
  }

  private escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
