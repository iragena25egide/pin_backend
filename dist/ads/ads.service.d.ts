import { Repository } from "typeorm";
import { Ad } from "../entities/ad.entity";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";
export declare class AdsService {
    private readonly repo;
    constructor(repo: Repository<Ad>);
    create(createDto: CreateAdDto): Promise<Ad>;
    findAll(): Promise<Ad[]>;
    findOne(id: number): Promise<Ad>;
    update(id: number, updateDto: UpdateAdDto): Promise<Ad>;
    remove(id: number): Promise<void>;
}
