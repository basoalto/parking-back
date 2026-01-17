import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';
import { AssignPersonToCarDto } from './dto/assign-person-to-car.dto';
import { Person } from '../person/entities/person.entity';
export declare class CarService {
    private carRepository;
    private personRepository;
    constructor(carRepository: Repository<Car>, personRepository: Repository<Person>);
    assignPersonToCar(assignPersonToCarDto: AssignPersonToCarDto): Promise<Car>;
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
