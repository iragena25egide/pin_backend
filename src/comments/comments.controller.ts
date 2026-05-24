import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("comments")
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Post()
  create(@Body() createDto: CreateCommentDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get("post/:postId")
  findByPost(@Param("postId") postId: string) {
    return this.service.findByPost(+postId);
  }

  @Get("video/:videoId")
  findByVideo(@Param("videoId") videoId: string) {
    return this.service.findByVideo(+videoId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard('jwt'))
  update(@Param("id") id: string, @Body() updateDto: UpdateCommentDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
