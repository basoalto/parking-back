import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Prize {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column('int')
	pointsRequired: number;

	@Column({ nullable: true })
	description?: string;
}
