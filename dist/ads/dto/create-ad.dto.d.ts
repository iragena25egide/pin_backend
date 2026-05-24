import { AdPosition, AdType } from "../../entities/ad.entity";
export declare class CreateAdDto {
    title?: string;
    link?: string;
    image_url?: string;
    video_url?: string;
    position?: AdPosition;
    type?: AdType;
    is_active?: boolean;
}
