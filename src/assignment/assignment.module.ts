import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { Assignment } from './entities/assignment.entity';
import { ParkingLot } from '../parkinglot/entities/parkinglot.entity';
import { Car } from '../car/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, ParkingLot, Car])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  exports: [TypeOrmModule],
})
export class AssignmentModule {}
