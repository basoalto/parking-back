import { IsString, IsInt } from 'class-validator';

export class AssignPersonToCarDto {
  @IsInt()
  carId: number;

  @IsString()
  rut: string;
}
