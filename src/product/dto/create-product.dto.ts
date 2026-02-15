export class CreateProductDto {
  name: string;
  barcode?: string;
  price: number;
  description?: string;
  parkingLotId: number;
  quantity: number;
}
