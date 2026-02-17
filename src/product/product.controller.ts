import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddProductStockDto } from './dto/add-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Crear producto y asociar a inventario de un estacionamiento
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.createProductWithStock(dto);
  }

  // Editar producto
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productService.updateProduct(id, dto);
  }
    // ...existing code...

    // Ventas totales de todos los productos de un estacionamiento en un rango de fechas
    @Get('sales/parkinglot/:parkingLotId')
    getTotalSalesByParkingLot(
      @Param('parkingLotId') parkingLotId: number,
      @Query('startDate') startDate: string,
      @Query('endDate') endDate: string,
    ) {
      return this.productService.getTotalSalesByParkingLot(
        Number(parkingLotId),
        new Date(startDate),
        new Date(endDate)
      );
    }

    // Ventas totales de un producto por id en un rango de fechas
    @Get('sales/product/:productId')
    getTotalSalesByProduct(
      @Param('productId') productId: number,
      @Query('startDate') startDate: string,
      @Query('endDate') endDate: string,
    ) {
      return this.productService.getTotalSalesByProduct(
        Number(productId),
        new Date(startDate),
        new Date(endDate)
      );
    }
  // Eliminar producto
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  // Obtener datos de un producto por id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  // Listar productos por estacionamiento
  @Get()
  findByParkingLot(@Query('parkingLotId') parkingLotId: number) {
    return this.productService.getProductsByParkingLot(parkingLotId);
  }

  // Agregar producto a inventario de estacionamiento
  @Post('stock')
  addStock(@Body() dto: AddProductStockDto) {
    return this.productService.addProductStock(dto);
  }

  // Descontar inventario de un producto
  // Descontar inventario de un producto
  @Patch('stock/:productId/:parkingLotId/decrement')
  decrementStock(
    @Param('productId') productId: number,
    @Param('parkingLotId') parkingLotId: number,
    @Body() dto: UpdateProductStockDto,
  ) {
    return this.productService.decrementProductStock(productId, parkingLotId, dto.quantity);
  }
}
