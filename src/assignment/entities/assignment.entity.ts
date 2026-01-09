import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carId: number;

  @Column()
  parkingLotId: number;

  @Column({ type: 'datetime' })
  fechaEntrada: Date;

  @Column({ type: 'datetime', nullable: true })
  fechaSalida?: Date;

  @Column('decimal')
  tarifa: number;

  @Column('decimal', { nullable: true })
  total?: number;
}
