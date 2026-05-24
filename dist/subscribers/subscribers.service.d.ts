import { Repository } from "typeorm";
import { Subscriber } from "../entities/subscriber.entity";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { UpdateSubscriberDto } from "./dto/update-subscriber.dto";
export declare class SubscribersService {
    private readonly repo;
    constructor(repo: Repository<Subscriber>);
    create(createDto: CreateSubscriberDto): Promise<Subscriber>;
    findAll(): Promise<Subscriber[]>;
    findOne(id: number): Promise<Subscriber>;
    update(id: number, updateDto: UpdateSubscriberDto): Promise<Subscriber>;
    remove(id: number): Promise<void>;
}
