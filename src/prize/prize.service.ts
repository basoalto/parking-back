import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { Prize } from './entities/prize.entity';

@Injectable()
export class PrizeService {
  constructor(
    @InjectRepository(Prize)
    private prizeRepository: Repository<Prize>,
  ) {}

  async create(createPrizeDto: CreatePrizeDto) {
    const prize = this.prizeRepository.create(createPrizeDto);
    return this.prizeRepository.save(prize);
  }

  async findAll() {
    return this.prizeRepository.find();
  }

  async findOne(id: number) {
    return this.prizeRepository.findOneBy({ id });
  }

  async update(id: number, updatePrizeDto: UpdatePrizeDto) {
    await this.prizeRepository.update(id, updatePrizeDto);
    return this.prizeRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.prizeRepository.delete(id);
    return { deleted: true };
  }
}
