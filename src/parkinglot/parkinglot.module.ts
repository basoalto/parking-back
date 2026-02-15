import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkinglotService } from './parkinglot.service';
import { ParkinglotController } from './parkinglot.controller';
import { ParkingLot } from './entities/parkinglot.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingLot]), ProductModule],
  controllers: [ParkinglotController],
  providers: [ParkinglotService],
  exports: [TypeOrmModule],
})
export class ParkinglotModule {}
