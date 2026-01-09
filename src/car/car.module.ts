import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './entities/car.entity';
import { PrizeModule } from '../prize/prize.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), PrizeModule],
  controllers: [CarController],
  providers: [CarService],
  exports: [TypeOrmModule],
})
export class CarModule {}
