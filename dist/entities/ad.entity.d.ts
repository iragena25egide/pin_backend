export declare enum AdPosition {
    HEADER = "header",
    SIDEBAR = "sidebar",
    BETWEEN_POSTS = "between_posts",
    FOOTER = "footer",
    TOP = "top"
}
export declare enum AdType {
    BANNER = "banner",
    VIDEO = "video",
    SPONSORED = "sponsored"
}
export declare class Ad {
    id: number;
    title: string;
    image_url?: string;
    video_url?: string;
    link?: string;
    position: AdPosition;
    type: AdType;
    start_date?: Date;
    end_date?: Date;
    clicks: number;
    impressions: number;
    is_active: boolean;
    created_at: Date;
}
