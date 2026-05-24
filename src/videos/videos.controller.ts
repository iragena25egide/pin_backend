import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("videos")
export class VideosController {
  constructor(private readonly service: VideosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDto: CreateVideoDto) {
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

  @Get("slug/:slug")
  findBySlug(@Param("slug") slug: string) {
    return this.service.findBySlug(slug);
  }

  @Patch(":id")
  @UseGuards(AuthGuard('jwt'))
  update(@Param("id") id: string, @Body() updateDto: UpdateVideoDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }

  @Post("sync-youtube")
  @UseGuards(AuthGuard('jwt'))
  syncYouTube() {
    return this.service.syncYouTube();
  }
}
