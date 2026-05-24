import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    create(createDto: CreateUserDto): Promise<import("../entities/user.entity").User>;
    findAll(): Promise<import("../entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../entities/user.entity").User>;
    update(id: string, updateDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
