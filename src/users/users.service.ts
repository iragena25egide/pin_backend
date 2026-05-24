import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import { User, UserRole } from "../entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminEmail = 'pintvrwanda@gmail.com';
    const existingAdmin = await this.repo.findOneBy({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('pinTV@123', 10);
      const newAdmin = this.repo.create({
        name: 'PIN TV ADMIN',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
        is_active: true,
      });
      await this.repo.save(newAdmin);
      console.log('✅ Admin user successfully seeded on startup.');
    }
  }

  async create(createDto: CreateUserDto): Promise<User> {
    if (createDto.password) {
      createDto.password = await bcrypt.hash(createDto.password, 10);
    }
    const item = this.repo.create(createDto as DeepPartial<User>);
    return this.repo.save(item);
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException("User with ID " + id + " not found");
    }
    return item;
  }

  async update(id: number, updateDto: UpdateUserDto): Promise<User> {
    const item = await this.findOne(id);
    if (updateDto.password) {
      updateDto.password = await bcrypt.hash(updateDto.password, 10);
    } else {
      delete updateDto.password;
    }
    const updated = this.repo.merge(item, updateDto as DeepPartial<User>);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
