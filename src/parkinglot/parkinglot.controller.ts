import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkinglotService } from './parkinglot.service';
import { CreateParkinglotDto } from './dto/create-parkinglot.dto';
import { UpdateParkinglotDto } from './dto/update-parkinglot.dto';

@Controller('parkinglot')
export class ParkinglotController {
  constructor(private readonly parkinglotService: ParkinglotService) {}

  @Post()
  create(@Body() createParkinglotDto: CreateParkinglotDto) {
    return this.parkinglotService.create(createParkinglotDto);
  }

  @Get()
  findAll() {
    return this.parkinglotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkinglotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkinglotDto: UpdateParkinglotDto) {
    return this.parkinglotService.update(+id, updateParkinglotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkinglotService.remove(+id);
  }
}
