import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getStats(): Promise<{
        totalUsers: number;
        totalPosts: number;
        totalVideos: number;
        totalComments: number;
        totalOnsiteLikes: number;
        totalYoutubeViews: number;
        totalYoutubeLikes: number;
    }>;
}
