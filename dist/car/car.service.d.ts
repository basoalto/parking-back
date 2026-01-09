import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';
export declare class CarService {
    private carRepository;
    constructor(carRepository: Repository<Car>);
    create(createCarDto: CreateCarDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCarDto: any): Promise<Car | null>;
    findByPlate(placa: string): Promise<Car | null>;
    remove(id: number): string;
    redeemPrize(placa: string, prize: {
        pointsRequired: number;
    }): Promise<Car>;
}
