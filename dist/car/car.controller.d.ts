import { AssignPersonToCarDto } from './dto/assign-person-to-car.dto';
import { PrizeService } from '../prize/prize.service';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
export declare class CarController {
    private readonly carService;
    private readonly prizeService;
    constructor(carService: CarService, prizeService: PrizeService);
    redeemPrize(placa: string, prizeId: string): Promise<import("./entities/car.entity").Car>;
    assignPersonToCar(assignPersonToCarDto: AssignPersonToCarDto): Promise<import("./entities/car.entity").Car>;
    create(createCarDto: CreateCarDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCarDto: any): Promise<import("./entities/car.entity").Car | null>;
    remove(id: string): string;
    findByPlate(placa: string): Promise<import("./entities/car.entity").Car | null>;
}
