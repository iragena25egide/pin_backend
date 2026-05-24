import { OnModuleInit } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService implements OnModuleInit {
    private readonly repo;
    constructor(repo: Repository<User>);
    onModuleInit(): Promise<void>;
    create(createDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
