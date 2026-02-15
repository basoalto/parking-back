export class UpdateProductDto {
  name?: string;
  barcode?: string;
  price?: number;
  description?: string;
  quantity?: number; // Para actualizar stock si se envía
  parkingLotId?: number; // Para identificar el stock a actualizar
}
