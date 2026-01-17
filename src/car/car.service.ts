
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { AssignPersonToCarDto } from './dto/assign-person-to-car.dto';
import { Person } from '../person/entities/person.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}
  async assignPersonToCar(assignPersonToCarDto: AssignPersonToCarDto) {
    const { carId, rut } = assignPersonToCarDto;
    let car = await this.carRepository.findOne({ where: { id: carId }, relations: ['person'] });
    if (!car) {
      // Crear auto mínimo si no existe
      
      car = this.carRepository.create({ id: carId, placa: '', marca: '', modelo: '', color: '', puntaje: 0 });
      await this.carRepository.save(car);
    }
    let person = await this.personRepository.findOne({ where: { rut } });
    if (!person) {
      person = this.personRepository.create({ rut, nombre: rut }); // nombre temporal igual al rut
      await this.personRepository.save(person);
    }
    car.person = person;
    await this.carRepository.save(car);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  async update(id: number, updateCarDto: any) {
    await this.carRepository.update(id, updateCarDto);
    return this.carRepository.findOneBy({ id });
  }

  async findByPlate(placa: string) {
    return this.carRepository.findOneBy({ placa });
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
  async redeemPrize(placa: string, prize: { pointsRequired: number }) {
    const car = await this.carRepository.findOneBy({ placa });
    if (!car) throw new Error('Car not found');
    if (car.puntaje < prize.pointsRequired) throw new Error('Not enough points');
    car.puntaje -= prize.pointsRequired;
    await this.carRepository.save(car);
    return car;
  }

}
