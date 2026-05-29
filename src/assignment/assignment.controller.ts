import { Query, BadRequestException } from '@nestjs/common';

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignment')
@UseGuards(JwtAuthGuard)
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }
  @Get('total')
  async getTotalByParkingLotAndDate(
    @Query('parkingLotId') parkingLotId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    console.log('GET /assignment/total', { parkingLotId, startDate, endDate });
    if (!parkingLotId || isNaN(Number(parkingLotId))) {
      throw new BadRequestException('parkingLotId es requerido y debe ser numérico');
    }
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate y endDate son requeridos');
    }
    return this.assignmentService.getTotalByParkingLotAndDate(Number(parkingLotId), startDate, endDate);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentService.update(+id, updateAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(+id);
  }

  @Post('by-plate')
  async createByPlate(@Body() body: { placa: string; parkingLotId: number }) {
    return this.assignmentService.createByPlate(body.placa, body.parkingLotId);
  }

  @Get('active/:parkingLotId')
  findActiveByParkingLot(@Param('parkingLotId') parkingLotId: string) {
    return this.assignmentService.findActiveByParkingLot(+parkingLotId);
  }

  @Get('finished/:parkingLotId')
  findFinishedByParkingLot(@Param('parkingLotId') parkingLotId: string) {
    return this.assignmentService.findFinishedByParkingLot(+parkingLotId);
  }
}
