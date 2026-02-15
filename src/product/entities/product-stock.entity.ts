import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { ParkingLot } from '../../parkinglot/entities/parkinglot.entity';

@Entity()
export class ProductStock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.stocks)
  product: Product;

  @ManyToOne(() => ParkingLot)
  parkingLot: ParkingLot;

  @Column('int')
  quantity: number;
}
