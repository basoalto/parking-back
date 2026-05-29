import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ParkingLot } from '../../parkinglot/entities/parkinglot.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ default: 'user' })
	role: string; // 'user' | 'admin' | etc.

	// Asociación a estacionamiento (obligatorio para usuarios comunes)
	@ManyToOne(() => ParkingLot, { nullable: true })
	@JoinColumn({ name: 'parkingLotId' })
	parkingLot?: ParkingLot;

	@Column({ nullable: true })
	parkingLotId?: number;

	// Asociación a empresa (obligatorio para admin, opcional para user)
	@ManyToOne(() => Company, { nullable: true })
	@JoinColumn({ name: 'companyId' })
	company?: Company;

	@Column({ nullable: true })
	companyId?: number;
}
