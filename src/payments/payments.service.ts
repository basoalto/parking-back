import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PaymentsService {
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  // Cliente Mercado Pago (puedes mover el access token a env en producción)
  private mpClient = new MercadoPagoConfig({
    accessToken: 'APP_USR-4697759812366882-052521-6b07a2be614fe80577541822190712bd-3427710582',
  });

  /**
   * Crea una preferencia de pago de prueba en Mercado Pago
   * @param title Título del producto
   * @param price Precio del producto
   * @param quantity Cantidad
   */
  async createPreference(title: string, price: number, quantity: number = 1) {
    const preference = new Preference(this.mpClient);
    const body = {
      items: [
        {
          id: 'item-' + Date.now(), // id único de ejemplo
          title,
          unit_price: price,
          quantity,
        },
      ],
    };
    try {
      const response = await preference.create({ body });
      return response;
    } catch (error: any) {
      throw new Error('Error al crear preferencia de pago: ' + error.message);
    }
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
