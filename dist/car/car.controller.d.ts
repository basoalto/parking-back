import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    create(createCarDto: CreateCarDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCarDto: any): Promise<import("./entities/car.entity").Car | null>;
    remove(id: string): string;
}
