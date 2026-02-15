import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductStock } from './product-stock.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  barcode?: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ProductStock, stock => stock.product)
  stocks: ProductStock[];
}
