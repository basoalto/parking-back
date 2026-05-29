export class CreateUserDto {
  email: string;
  password: string;
  role?: string; // opcional, por defecto 'user'
  parkingLotId?: number; // obligatorio para usuarios comunes
  companyId?: number; // id de empresa para admin
}
