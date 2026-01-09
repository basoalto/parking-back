
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkinglotModule } from './parkinglot/parkinglot.module';
import { CarModule } from './car/car.module';
import { AssignmentModule } from './assignment/assignment.module';
import { ParkingLot } from './parkinglot/entities/parkinglot.entity';
import { Car } from './car/entities/car.entity';
import { Assignment } from './assignment/entities/assignment.entity';
import { PrizeModule } from './prize/prize.module';
import { Prize } from './prize/entities/prize.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ParkingLot, Car, Assignment, Prize],
      synchronize: true,
    }),
    ParkinglotModule,
    CarModule,
    AssignmentModule,
    PrizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
