import { SitemapService } from './sitemap.service';
export declare class SitemapController {
    private readonly sitemapService;
    constructor(sitemapService: SitemapService);
    getSitemap(): Promise<string>;
    getRobotsTxt(): Promise<string>;
}
