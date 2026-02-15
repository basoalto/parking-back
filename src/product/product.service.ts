import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductStock } from './entities/product-stock.entity';
import { Sale } from './entities/sale.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductStock)
    private stockRepository: Repository<ProductStock>,
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}


  // Crear producto y asociar a inventario de un estacionamiento
  async createProductWithStock(dto: any) {
    const { parkingLotId, quantity, ...productData } = dto;
    const created = this.productRepository.create(productData);
    if (!created || Array.isArray(created)) {
      throw new Error('Error: create() devolvió un array o valor inválido, se esperaba un solo producto.');
    }
    const product = await this.productRepository.save(created);
    if (!product || Array.isArray(product) || typeof product !== 'object') {
      throw new Error('Error: save() devolvió un array o valor inválido, se esperaba un solo producto.');
    }
    const stock = this.stockRepository.create({
      product: { id: (product as Product).id },
      parkingLot: { id: parkingLotId },
      quantity,
    });
    const savedStock = await this.stockRepository.save(stock);
    return { product, stock: savedStock };
  }

  // Editar producto y opcionalmente actualizar cantidad de stock
  async updateProduct(id: number, dto: any) {
    const { quantity, parkingLotId, ...productFields } = dto;
    // Actualizar producto
    await this.productRepository.update(id, productFields);
    let stockUpdate: ProductStock | null = null;
    if (typeof quantity === 'number' && parkingLotId) {
      // Buscar el stock correspondiente
      let stock = await this.stockRepository.findOne({
        where: { product: { id }, parkingLot: { id: parkingLotId } },
        relations: ['product', 'parkingLot'],
      });
      if (stock) {
        stock.quantity = quantity;
        stockUpdate = await this.stockRepository.save(stock);
      }
    }
    const product = await this.productRepository.findOne({ where: { id } });
    return { product, stock: stockUpdate };
  }

  // Eliminar producto
  async deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }

  // Obtener datos de un producto por id
  async getProductById(id: number) {
    return this.productRepository.findOne({ where: { id }, relations: ['stocks'] });
  }

  // Listar productos por estacionamiento
  async getProductsByParkingLot(parkingLotId: number) {
    const stocks = await this.stockRepository.find({
      where: { parkingLot: { id: parkingLotId } },
      relations: ['product', 'parkingLot'],
    });
    return stocks;
  }

  // Agregar producto a inventario de estacionamiento
  async addProductStock(dto: any) {
    let stock = await this.stockRepository.findOne({
      where: {
        product: { id: dto.productId },
        parkingLot: { id: dto.parkingLotId },
      },
      relations: ['product', 'parkingLot'],
    });
    if (stock) {
      stock.quantity += dto.quantity;
    } else {
      stock = this.stockRepository.create({
        product: { id: dto.productId },
        parkingLot: { id: dto.parkingLotId },
        quantity: dto.quantity,
      });
    }
    return this.stockRepository.save(stock);
  }

  // Descontar inventario de un producto y registrar venta
  async decrementProductStock(stockId: number, quantity: number) {
    const stock = await this.stockRepository.findOne({ where: { id: stockId }, relations: ['product', 'parkingLot'] });
    if (!stock) throw new Error('Stock not found');
    if (stock.quantity < quantity) throw new Error('Not enough stock');
    stock.quantity -= quantity;
    await this.stockRepository.save(stock);
    // Registrar venta
    const sale = this.saleRepository.create({
      product: stock.product,
      parkingLot: stock.parkingLot,
      quantity,
      date: new Date(),
    });
    await this.saleRepository.save(sale);
    return { stock, sale };
  }
}
