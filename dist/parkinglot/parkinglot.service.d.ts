import { Repository } from 'typeorm';
import { CreateParkinglotDto } from './dto/create-parkinglot.dto';
import { UpdateParkinglotDto } from './dto/update-parkinglot.dto';
import { ParkingLot } from './entities/parkinglot.entity';
export declare class ParkinglotService {
    private parkingLotRepository;
    constructor(parkingLotRepository: Repository<ParkingLot>);
    create(createParkinglotDto: CreateParkinglotDto): Promise<ParkingLot>;
    findAll(): Promise<ParkingLot[]>;
    findOne(id: number): Promise<ParkingLot | null>;
    update(id: number, updateParkinglotDto: UpdateParkinglotDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
