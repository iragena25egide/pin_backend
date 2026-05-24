import { AdsService } from "./ads.service";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";
export declare class AdsController {
    private readonly service;
    constructor(service: AdsService);
    create(createDto: CreateAdDto): Promise<import("../entities/ad.entity").Ad>;
    findAll(): Promise<import("../entities/ad.entity").Ad[]>;
    findOne(id: string): Promise<import("../entities/ad.entity").Ad>;
    update(id: string, updateDto: UpdateAdDto): Promise<import("../entities/ad.entity").Ad>;
    remove(id: string): Promise<void>;
}
