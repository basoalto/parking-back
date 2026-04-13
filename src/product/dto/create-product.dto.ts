export class CreateProductDto {
  name: string;
  barcode?: string;
  price: number;
  costPrice?: number;
  description?: string;
  parkingLotId: number;
  quantity: number;
}
