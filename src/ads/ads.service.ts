import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ad } from "../entities/ad.entity";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly repo: Repository<Ad>,
  ) {}

  async create(createDto: CreateAdDto): Promise<Ad> {
    const item = this.repo.create(createDto);
    return this.repo.save(item);
  }

  findAll(): Promise<Ad[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Ad> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("Ad with ID " + id + " not found");
    }
    return item;
  }

  async update(id: number, updateDto: UpdateAdDto): Promise<Ad> {
    const item = await this.findOne(id);
    const updated = this.repo.merge(item, updateDto);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
