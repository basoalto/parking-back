import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from '../../person/entities/person.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placa: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  color: string;

  @Column({ default: 0 })
  puntaje: number;

  @ManyToOne(() => Person, person => person.cars, { nullable: true })
  person: Person;

}
