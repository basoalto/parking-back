
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
import { Person } from './person/entities/person.entity';
import { PersonModule } from './person/person.module';
import { Product } from './product/entities/product.entity';
import { ProductStock } from './product/entities/product-stock.entity';
import { Sale } from './product/entities/sale.entity';
import { ProductModule } from './product/product.module';

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
      entities: [ParkingLot, Car, Assignment, Prize, Person, Product, ProductStock, Sale],
      synchronize: true, // ¡IMPORTANTE! Solo para desarrollo. Vuelve a false después de crear las tablas.
    }),
    ParkinglotModule,
    CarModule,
    AssignmentModule,
    PrizeModule,
    PersonModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
