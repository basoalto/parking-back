import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from '../../car/entities/car.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  rut: string;

  @Column()
  nombre: string;

  // Puedes agregar más campos si lo necesitas

  
  @OneToMany(() => Car, car => car.person)
  cars: Car[];

}
