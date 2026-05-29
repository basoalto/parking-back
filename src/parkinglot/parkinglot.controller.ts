import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('companyId') companyId?: number) {
    if (companyId) {
      return this.parkinglotService.findByCompanyId(Number(companyId));
    }
    return this.parkinglotService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkinglotService.findOne(+id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkinglotDto: UpdateParkinglotDto) {
    return this.parkinglotService.update(+id, updateParkinglotDto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkinglotService.remove(+id);
  }
}
