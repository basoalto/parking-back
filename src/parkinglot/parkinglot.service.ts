import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParkinglotDto } from './dto/create-parkinglot.dto';
import { UpdateParkinglotDto } from './dto/update-parkinglot.dto';
import { ParkingLot } from './entities/parkinglot.entity';

@Injectable()
export class ParkinglotService {
  constructor(
    @InjectRepository(ParkingLot)
    private parkingLotRepository: Repository<ParkingLot>,
  ) {}

  create(createParkinglotDto: CreateParkinglotDto) {
    const parkingLot = this.parkingLotRepository.create(createParkinglotDto);
    return this.parkingLotRepository.save(parkingLot);
  }

  findAll() {
    return this.parkingLotRepository.find();
  }

  findOne(id: number) {
    return this.parkingLotRepository.findOneBy({ id });
  }

  update(id: number, updateParkinglotDto: UpdateParkinglotDto) {
    return this.parkingLotRepository.update(id, updateParkinglotDto);
  }

  remove(id: number) {
    return this.parkingLotRepository.delete(id);
  }
}
