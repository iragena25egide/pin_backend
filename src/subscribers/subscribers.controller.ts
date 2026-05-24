import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { SubscribersService } from "./subscribers.service";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { UpdateSubscriberDto } from "./dto/update-subscriber.dto";

@Controller("subscribers")
export class SubscribersController {
  constructor(private readonly service: SubscribersService) {}

  @Post()
  create(@Body() createDto: CreateSubscriberDto) {
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
  update(@Param("id") id: string, @Body() updateDto: UpdateSubscriberDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
