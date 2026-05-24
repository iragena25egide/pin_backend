import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() createDto: CreateUserDto) {
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
  update(@Param("id") id: string, @Body() updateDto: UpdateUserDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
