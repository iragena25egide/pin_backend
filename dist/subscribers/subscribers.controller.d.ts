import { SubscribersService } from "./subscribers.service";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { UpdateSubscriberDto } from "./dto/update-subscriber.dto";
export declare class SubscribersController {
    private readonly service;
    constructor(service: SubscribersService);
    create(createDto: CreateSubscriberDto): Promise<import("../entities/subscriber.entity").Subscriber>;
    findAll(): Promise<import("../entities/subscriber.entity").Subscriber[]>;
    findOne(id: string): Promise<import("../entities/subscriber.entity").Subscriber>;
    update(id: string, updateDto: UpdateSubscriberDto): Promise<import("../entities/subscriber.entity").Subscriber>;
    remove(id: string): Promise<void>;
}
