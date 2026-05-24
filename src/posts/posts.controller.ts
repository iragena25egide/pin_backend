import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("posts")
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDto: CreatePostDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query("category") category?: string) {
    return this.service.findAll(category);
  }

  @Get("slug/:slug")
  findBySlug(@Param("slug") slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get("search")
  search(@Query("q") q: string) {
    return this.service.search(q);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard('jwt'))
  update(@Param("id") id: string, @Body() updateDto: UpdatePostDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
