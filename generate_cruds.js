const fs = require('fs');
const path = require('path');

const resources = [
  {
    name: 'users',
    entityName: 'User',
    entityPath: '../entities/user.entity',
    dtoFields: `  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() password?: string;
  @IsOptional() @IsString() role?: string;`,
  },
  {
    name: 'videos',
    entityName: 'Video',
    entityPath: '../entities/video.entity',
    dtoFields: `  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() video_url?: string;
  @IsOptional() @IsString() youtube_video_id?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsBoolean() is_live?: boolean;`,
  },
  {
    name: 'comments',
    entityName: 'Comment',
    entityPath: '../entities/comment.entity',
    dtoFields: `  @IsOptional() @IsNumber() post_id?: number;
  @IsOptional() @IsNumber() video_id?: number;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() author_name?: string;
  @IsOptional() @IsEmail() author_email?: string;`,
  },
  {
    name: 'ads',
    entityName: 'Ad',
    entityPath: '../entities/ad.entity',
    dtoFields: `  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() link?: string;
  @IsOptional() @IsBoolean() is_active?: boolean;`,
  },
  {
    name: 'contact-messages',
    entityName: 'ContactMessage',
    entityPath: '../entities/contact-message.entity',
    dtoFields: `  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() subject?: string;
  @IsOptional() @IsString() message?: string;
  @IsOptional() @IsBoolean() is_read?: boolean;`,
  },
  {
    name: 'subscribers',
    entityName: 'Subscriber',
    entityPath: '../entities/subscriber.entity',
    dtoFields: `  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsBoolean() is_active?: boolean;`,
  },
  {
    name: 'posts',
    entityName: 'Post',
    entityPath: '../entities/post.entity',
    dtoFields: `  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsBoolean() is_sponsored?: boolean;
  @IsOptional() @IsBoolean() is_featured?: boolean;`,
  }
];

resources.forEach(res => {
  const dir = path.join(__dirname, 'src', res.name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const dtoDir = path.join(dir, 'dto');
  if (!fs.existsSync(dtoDir)) fs.mkdirSync(dtoDir, { recursive: true });

  const capitalizedName = res.name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  const singularName = res.entityName.toLowerCase();
  const dtoBaseName = res.name.replace(/s$/, ''); // posts -> post, users -> user

  // DTOs
  const createDto = 'import { IsString, IsOptional, IsBoolean, IsNumber, IsEmail } from "class-validator";\n' +
'export class Create' + res.entityName + 'Dto {\n' +
res.dtoFields + '\n' +
'}';
  fs.writeFileSync(path.join(dtoDir, 'create-' + dtoBaseName + '.dto.ts'), createDto);

  const updateDto = 'import { PartialType } from "@nestjs/mapped-types";\n' +
'import { Create' + res.entityName + 'Dto } from "./create-' + dtoBaseName + '.dto";\n' +
'export class Update' + res.entityName + 'Dto extends PartialType(Create' + res.entityName + 'Dto) {}';
  fs.writeFileSync(path.join(dtoDir, 'update-' + dtoBaseName + '.dto.ts'), updateDto);

  // Service
  const service = 'import { Injectable, NotFoundException } from "@nestjs/common";\n' +
'import { InjectRepository } from "@nestjs/typeorm";\n' +
'import { Repository } from "typeorm";\n' +
'import { ' + res.entityName + ' } from "' + res.entityPath + '";\n' +
'import { Create' + res.entityName + 'Dto } from "./dto/create-' + dtoBaseName + '.dto";\n' +
'import { Update' + res.entityName + 'Dto } from "./dto/update-' + dtoBaseName + '.dto";\n' +
'\n' +
'@Injectable()\n' +
'export class ' + capitalizedName + 'Service {\n' +
'  constructor(\n' +
'    @InjectRepository(' + res.entityName + ')\n' +
'    private readonly repo: Repository<' + res.entityName + '>,\n' +
'  ) {}\n' +
'\n' +
'  async create(createDto: Create' + res.entityName + 'Dto): Promise<' + res.entityName + '> {\n' +
'    const item = this.repo.create(createDto);\n' +
'    return this.repo.save(item);\n' +
'  }\n' +
'\n' +
'  findAll(): Promise<' + res.entityName + '[]> {\n' +
'    return this.repo.find();\n' +
'  }\n' +
'\n' +
'  async findOne(id: number): Promise<' + res.entityName + '> {\n' +
'    const item = await this.repo.findOneBy({ id });\n' +
'    if (!item) {\n' +
'      throw new NotFoundException("' + res.entityName + ' with ID " + id + " not found");\n' +
'    }\n' +
'    return item;\n' +
'  }\n' +
'\n' +
'  async update(id: number, updateDto: Update' + res.entityName + 'Dto): Promise<' + res.entityName + '> {\n' +
'    const item = await this.findOne(id);\n' +
'    const updated = this.repo.merge(item, updateDto);\n' +
'    return this.repo.save(updated);\n' +
'  }\n' +
'\n' +
'  async remove(id: number): Promise<void> {\n' +
'    const item = await this.findOne(id);\n' +
'    await this.repo.remove(item);\n' +
'  }\n' +
'}\n';
  fs.writeFileSync(path.join(dir, res.name + '.service.ts'), service);

  // Controller
  const controller = 'import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";\n' +
'import { ' + capitalizedName + 'Service } from "./' + res.name + '.service";\n' +
'import { Create' + res.entityName + 'Dto } from "./dto/create-' + dtoBaseName + '.dto";\n' +
'import { Update' + res.entityName + 'Dto } from "./dto/update-' + dtoBaseName + '.dto";\n' +
'\n' +
'@Controller("' + res.name + '")\n' +
'export class ' + capitalizedName + 'Controller {\n' +
'  constructor(private readonly service: ' + capitalizedName + 'Service) {}\n' +
'\n' +
'  @Post()\n' +
'  create(@Body() createDto: Create' + res.entityName + 'Dto) {\n' +
'    return this.service.create(createDto);\n' +
'  }\n' +
'\n' +
'  @Get()\n' +
'  findAll() {\n' +
'    return this.service.findAll();\n' +
'  }\n' +
'\n' +
'  @Get(":id")\n' +
'  findOne(@Param("id") id: string) {\n' +
'    return this.service.findOne(+id);\n' +
'  }\n' +
'\n' +
'  @Patch(":id")\n' +
'  update(@Param("id") id: string, @Body() updateDto: Update' + res.entityName + 'Dto) {\n' +
'    return this.service.update(+id, updateDto);\n' +
'  }\n' +
'\n' +
'  @Delete(":id")\n' +
'  remove(@Param("id") id: string) {\n' +
'    return this.service.remove(+id);\n' +
'  }\n' +
'}\n';
  fs.writeFileSync(path.join(dir, res.name + '.controller.ts'), controller);

  // Module
  const moduleFile = 'import { Module } from "@nestjs/common";\n' +
'import { TypeOrmModule } from "@nestjs/typeorm";\n' +
'import { ' + capitalizedName + 'Service } from "./' + res.name + '.service";\n' +
'import { ' + capitalizedName + 'Controller } from "./' + res.name + '.controller";\n' +
'import { ' + res.entityName + ' } from "' + res.entityPath + '";\n' +
'\n' +
'@Module({\n' +
'  imports: [TypeOrmModule.forFeature([' + res.entityName + '])],\n' +
'  controllers: [' + capitalizedName + 'Controller],\n' +
'  providers: [' + capitalizedName + 'Service],\n' +
'  exports: [' + capitalizedName + 'Service],\n' +
'})\n' +
'export class ' + capitalizedName + 'Module {}\n';
  fs.writeFileSync(path.join(dir, res.name + '.module.ts'), moduleFile);
});

console.log('CRUD generated successfully.');
