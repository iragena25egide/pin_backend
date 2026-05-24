import { Repository } from "typeorm";
import { ContactMessage } from "../entities/contact-message.entity";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";
import { UpdateContactMessageDto } from "./dto/update-contact-message.dto";
export declare class ContactMessagesService {
    private readonly repo;
    constructor(repo: Repository<ContactMessage>);
    create(createDto: CreateContactMessageDto): Promise<ContactMessage>;
    findAll(): Promise<ContactMessage[]>;
    findOne(id: number): Promise<ContactMessage>;
    update(id: number, updateDto: UpdateContactMessageDto): Promise<ContactMessage>;
    remove(id: number): Promise<void>;
}
