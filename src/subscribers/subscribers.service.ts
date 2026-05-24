import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscriber } from "../entities/subscriber.entity";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { UpdateSubscriberDto } from "./dto/update-subscriber.dto";

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly repo: Repository<Subscriber>,
  ) {}

  async create(createDto: CreateSubscriberDto): Promise<Subscriber> {
    const item = this.repo.create(createDto);
    return this.repo.save(item);
  }

  findAll(): Promise<Subscriber[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Subscriber> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("Subscriber with ID " + id + " not found");
    }
    return item;
  }

  async update(id: number, updateDto: UpdateSubscriberDto): Promise<Subscriber> {
    const item = await this.findOne(id);
    const updated = this.repo.merge(item, updateDto);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
