import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ParkingLot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column('decimal')
  tarifaPorHora: number;

  @Column('decimal', { default: 0 })
  tarifaMinima: number;
}
