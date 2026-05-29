import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

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

  @ManyToOne(() => Company, company => company.parkingLots, { nullable: false })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: number;
}
