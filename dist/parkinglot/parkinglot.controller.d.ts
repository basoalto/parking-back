import { ParkinglotService } from './parkinglot.service';
import { CreateParkinglotDto } from './dto/create-parkinglot.dto';
import { UpdateParkinglotDto } from './dto/update-parkinglot.dto';
export declare class ParkinglotController {
    private readonly parkinglotService;
    constructor(parkinglotService: ParkinglotService);
    create(createParkinglotDto: CreateParkinglotDto): Promise<import("./entities/parkinglot.entity").ParkingLot>;
    findAll(): Promise<import("./entities/parkinglot.entity").ParkingLot[]>;
    findOne(id: string): Promise<import("./entities/parkinglot.entity").ParkingLot | null>;
    update(id: string, updateParkinglotDto: UpdateParkinglotDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
