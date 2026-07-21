export declare class Post {
    id: number;
    title: string;
    slug?: string;
    content: string;
    excerpt?: string;
    author?: string;
    image?: string;
    category?: string[];
    views: number;
    is_sponsored: boolean;
    is_featured: boolean;
    created_at: Date;
    language?: string;
}
