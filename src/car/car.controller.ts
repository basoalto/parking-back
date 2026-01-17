import { AssignPersonToCarDto } from './dto/assign-person-to-car.dto';

import { PrizeService } from '../prize/prize.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly prizeService: PrizeService,
  ) {}
  @Post('redeem/:placa/:prizeId')
  async redeemPrize(@Param('placa') placa: string, @Param('prizeId') prizeId: string) {
    const prize = await this.prizeService.findOne(+prizeId);
    if (!prize) throw new Error('Prize not found');
    return this.carService.redeemPrize(placa, prize);
  }
  @Post('assign-person')
  async assignPersonToCar(@Body() assignPersonToCarDto: AssignPersonToCarDto) {
    return this.carService.assignPersonToCar(assignPersonToCarDto);
  }
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: any) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }

  @Get('plate/:placa')
  findByPlate(@Param('placa') placa: string) {
    return this.carService.findByPlate(placa);
  }
}
