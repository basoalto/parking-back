import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignment')
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
