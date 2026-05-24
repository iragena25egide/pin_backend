import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { AdsService } from "./ads.service";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("ads")
export class AdsController {
  constructor(private readonly service: AdsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDto: CreateAdDto) {
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
  @UseGuards(AuthGuard('jwt'))
  update(@Param("id") id: string, @Body() updateDto: UpdateAdDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
