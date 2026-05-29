import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ParkingLot } from '../../parkinglot/entities/parkinglot.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ParkingLot, parkingLot => parkingLot.company)
  parkingLots: ParkingLot[];
}
