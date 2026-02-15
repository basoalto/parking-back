import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { ParkingLot } from '../../parkinglot/entities/parkinglot.entity';

@Entity()
export class ProductEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => ParkingLot)
  parkingLot: ParkingLot;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  date: Date;
}
