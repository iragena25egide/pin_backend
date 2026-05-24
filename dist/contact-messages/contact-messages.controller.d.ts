import { ContactMessagesService } from "./contact-messages.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";
import { UpdateContactMessageDto } from "./dto/update-contact-message.dto";
export declare class ContactMessagesController {
    private readonly service;
    constructor(service: ContactMessagesService);
    create(createDto: CreateContactMessageDto): Promise<import("../entities/contact-message.entity").ContactMessage>;
    findAll(): Promise<import("../entities/contact-message.entity").ContactMessage[]>;
    findOne(id: string): Promise<import("../entities/contact-message.entity").ContactMessage>;
    update(id: string, updateDto: UpdateContactMessageDto): Promise<import("../entities/contact-message.entity").ContactMessage>;
    remove(id: string): Promise<void>;
}
