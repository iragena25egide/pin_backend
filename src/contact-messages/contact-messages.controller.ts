import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ContactMessagesService } from "./contact-messages.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";
import { UpdateContactMessageDto } from "./dto/update-contact-message.dto";

@Controller("contact-messages")
export class ContactMessagesController {
  constructor(private readonly service: ContactMessagesService) {}

  @Post()
  create(@Body() createDto: CreateContactMessageDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDto: UpdateContactMessageDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
