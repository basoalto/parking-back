
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductStock } from './entities/product-stock.entity';
import { Sale } from './entities/sale.entity';
import { ProductEntry } from './entities/product-entry.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductStock)
    private stockRepository: Repository<ProductStock>,
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(ProductEntry)
    private entryRepository: Repository<ProductEntry>,
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

  // Ventas totales de todos los productos de un estacionamiento en un rango de fechas
  async getTotalSalesByParkingLot(parkingLotId: number, startDate: Date, endDate: Date) {
    const sales = await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.product', 'product')
      .where('sale.parkingLot = :parkingLotId', { parkingLotId })
      .andWhere('sale.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .select([
        'product.id AS productId',
        'product.name AS productName',
        'SUM(sale.quantity) AS totalQuantity',
        'SUM(sale.quantity * product.price) AS totalAmount'
      ])
      .groupBy('product.id')
      .addGroupBy('product.name')
      .getRawMany();
    return sales;
  }

  // Ventas totales de un producto por id en un rango de fechas
  async getTotalSalesByProduct(productId: number, startDate: Date, endDate: Date) {
      console.log('[getTotalSalesByProduct] startDate:', startDate, 'endDate:', endDate);
      // Mostrar el tipo y valor exacto de los parámetros
      console.log('[getTotalSalesByProduct] typeof startDate:', typeof startDate, 'typeof endDate:', typeof endDate);
      // Mostrar los valores originales recibidos
      console.log('[getTotalSalesByProduct] startDate (raw):', startDate);
      console.log('[getTotalSalesByProduct] endDate (raw):', endDate);
    // Ventas totales
    // Convertir fechas a string yyyy-MM-dd
    let startDateStr = '';
    let endDateStr = '';
    if (startDate) {
      if (typeof startDate === 'string') {
        startDateStr = String(startDate).slice(0, 10);
      } else if (startDate instanceof Date) {
        startDateStr = startDate.toISOString().slice(0, 10);
      } else {
        startDateStr = String(startDate).slice(0, 10);
      }
    }
    if (endDate) {
      if (typeof endDate === 'string') {
        endDateStr = String(endDate).slice(0, 10);
      } else if (endDate instanceof Date) {
        endDateStr = endDate.toISOString().slice(0, 10);
      } else {
        endDateStr = String(endDate).slice(0, 10);
      }
    }
    const sales = await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.product', 'product')
      .where('sale.product = :productId', { productId })
      .andWhere('DATE(sale.date) BETWEEN :startDate AND :endDate', { startDate: startDateStr, endDate: endDateStr })
      .select([
        'SUM(sale.quantity) AS totalQuantity',
        'SUM(sale.quantity * product.price) AS totalAmount'
      ])
      .getRawOne();

      // Ajustar endDate para incluir todo el día
      // ...existing code...
      // Historial de ingresos
      const entries = await this.entryRepository.createQueryBuilder('entry')
        .where('entry.productId = :productId', { productId })
        .andWhere('DATE(entry.date) BETWEEN :startDate AND :endDate', { startDate: startDateStr, endDate: endDateStr })
        .orderBy('entry.date', 'ASC')
        .getMany();
      if (entries.length > 0) {
        console.log('[getTotalSalesByProduct] fechas de ingresos:', entries.map(e => e.date));
        // Mostrar comparación de cada fecha de ingreso con el rango
        entries.forEach(e => {
          const entryDate = e.date instanceof Date ? e.date.toISOString() : e.date;
          console.log(`[getTotalSalesByProduct] Comparando ingreso: ${entryDate} (solo fecha: ${entryDate.substring(0,10)}) con rango ${startDate} - ${endDate}`);
        });
      } else {
        console.log('[getTotalSalesByProduct] No hay ingresos encontrados para el rango.');
      }

    // Calcular total de ingresos
    const totalEntries = entries.reduce((sum, e) => sum + e.quantity, 0);
    // Calcular total de cantidades vendidas
    let totalSold = 0;
    if (sales && sales.totalQuantity) {
      totalSold = Number(sales.totalQuantity);
    }
    return {
      sales,
      entries,
      totalEntries,
      totalSold
    };
  }


  // Editar producto y opcionalmente actualizar cantidad de stock
  async updateProduct(id: number, dto: any) {
    const { quantity, parkingLotId, ...productFields } = dto;
    // Actualizar producto
    console.log('[updateProduct] dto:', dto);
    await this.productRepository.update(id, productFields);
    let stockUpdate: ProductStock | null = null;
    if (typeof quantity === 'number' && parkingLotId) {
      // Buscar el stock correspondiente
      let stock = await this.stockRepository.findOne({
        where: { product: { id }, parkingLot: { id: parkingLotId } },
        relations: ['product', 'parkingLot'],
      });
      console.log('[updateProduct] stock encontrado:', stock);
      if (stock) {
        const cantidadAnterior = stock.quantity;
        stock.quantity = quantity;
        stockUpdate = await this.stockRepository.save(stock);
        console.log('[updateProduct] cantidadAnterior:', cantidadAnterior, 'nueva cantidad:', quantity);
        // Registrar solo si la cantidad aumenta
        if (quantity > cantidadAnterior) {
          const entry = this.entryRepository.create({
            product: { id },
            parkingLot: { id: parkingLotId },
            quantity: quantity - cantidadAnterior,
          });
          await this.entryRepository.save(entry);
          console.log('[updateProduct] Registro en ProductEntry:', entry);
        } else {
          console.log('[updateProduct] No se registra entrada porque la cantidad no aumentó.');
        }
      } else {
        console.log('[updateProduct] No se encontró stock para el producto y estacionamiento indicados.');
      }
    } else {
      console.log('[updateProduct] quantity o parkingLotId no válidos:', quantity, parkingLotId);
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
    const savedStock = await this.stockRepository.save(stock);
    // Registrar el ingreso en ProductEntry
    const entry = this.entryRepository.create({
      product: { id: dto.productId },
      parkingLot: { id: dto.parkingLotId },
      quantity: dto.quantity,
    });
    await this.entryRepository.save(entry);
    return savedStock;
  }

  // Descontar inventario de un producto y registrar venta
  async decrementProductStock(productId: number, parkingLotId: number, quantity: number) {
    const stock = await this.stockRepository.findOne({
      where: {
        product: { id: productId },
        parkingLot: { id: parkingLotId },
      },
      relations: ['product', 'parkingLot'],
    });
    if (!stock) {
      console.error(`[decrementProductStock] No se encontró stock para producto ${productId} y estacionamiento ${parkingLotId}`);
      throw new Error(`No se encontró inventario para el producto ${productId} y estacionamiento ${parkingLotId}. Verifica que el stock exista antes de descontar.`);
    }
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
