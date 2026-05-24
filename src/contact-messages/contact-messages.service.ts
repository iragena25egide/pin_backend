import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactMessage } from "../entities/contact-message.entity";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";
import { UpdateContactMessageDto } from "./dto/update-contact-message.dto";

@Injectable()
export class ContactMessagesService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly repo: Repository<ContactMessage>,
  ) {}

  async create(createDto: CreateContactMessageDto): Promise<ContactMessage> {
    const item = this.repo.create(createDto);
    return this.repo.save(item);
  }

  findAll(): Promise<ContactMessage[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ContactMessage> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("ContactMessage with ID " + id + " not found");
    }
    return item;
  }

  async update(id: number, updateDto: UpdateContactMessageDto): Promise<ContactMessage> {
    const item = await this.findOne(id);
    const updated = this.repo.merge(item, updateDto);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
