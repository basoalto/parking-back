import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkinglotService } from './parkinglot.service';
import { ParkinglotController } from './parkinglot.controller';
import { ParkingLot } from './entities/parkinglot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingLot])],
  controllers: [ParkinglotController],
  providers: [ParkinglotService],
  exports: [TypeOrmModule],
})
export class ParkinglotModule {}
