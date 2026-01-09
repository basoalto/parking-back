import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { ParkingLot } from '../parkinglot/entities/parkinglot.entity';
import { Car } from '../car/entities/car.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(ParkingLot)
    private parkingLotRepository: Repository<ParkingLot>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) { }

  async create(createAssignmentDto: CreateAssignmentDto) {
    const parkingLot = await this.parkingLotRepository.findOneBy({ id: createAssignmentDto.parkingLotId });
    if (!parkingLot) throw new Error('ParkingLot not found');
    const fechaEntrada = new Date();
    // Guardar los minutos exactos de entrada
    fechaEntrada.setSeconds(0, 0);
    const assignment = this.assignmentRepository.create({
      ...createAssignmentDto,
      fechaEntrada,
      tarifa: parkingLot.tarifaPorHora,
    });
    return this.assignmentRepository.save(assignment);
  }

  findAll() {
    return this.assignmentRepository.find({
      order: { fechaSalida: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.assignmentRepository.findOneBy({ id });
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const assignment = await this.assignmentRepository.findOneBy({ id });
    if (!assignment) return null;
    if (updateAssignmentDto.fechaSalida) {
      // Guardar los minutos exactos de salida
      const fechaSalida = new Date(updateAssignmentDto.fechaSalida);
      assignment.fechaSalida = fechaSalida;
      const ms = assignment.fechaSalida.getTime() - assignment.fechaEntrada.getTime();
      const minutos = Math.floor(ms / (1000 * 60));
      // Obtener tarifaMinima del estacionamiento
      const parkingLot = await this.parkingLotRepository.findOneBy({ id: assignment.parkingLotId });
      if (!parkingLot) throw new Error('ParkingLot not found');
      if (minutos <= 10) {
        assignment.total = parkingLot.tarifaMinima;
      } else {
        assignment.total = minutos * assignment.tarifa;
      }

      // <---LA LÓGICA DE PUNTAJE --->
      const puntos = Math.floor(minutos / 10); // 1 punto cada 10 minutos
      if (puntos > 0) {
        const car = await this.carRepository.findOneBy({ id: assignment.carId });
        if (car) {
          car.puntaje += puntos;
          await this.carRepository.save(car);
        }
      }
    }



    Object.assign(assignment, updateAssignmentDto);
    return this.assignmentRepository.save(assignment);
  }

  async remove(id: number) {
    const result = await this.assignmentRepository.delete(id);
    return { deleted: !!result.affected && result.affected > 0 };
  }

  async createByPlate(placa: string, parkingLotId: number) {
    // Buscar si la patente ya está registrada
    let car = await this.carRepository.findOneBy({ placa });
    if (!car) {
      car = this.carRepository.create({ placa, marca: '', modelo: '', color: '' });
      car = await this.carRepository.save(car);
    }
    // Crear la asignación
    const parkingLot = await this.parkingLotRepository.findOneBy({ id: parkingLotId });
    if (!parkingLot) throw new Error('ParkingLot not found');
    const fechaEntrada = new Date();
    fechaEntrada.setSeconds(0, 0);
    const assignment = this.assignmentRepository.create({
      carId: car.id,
      parkingLotId,
      fechaEntrada,
      tarifa: parkingLot.tarifaPorHora,
    });
    return this.assignmentRepository.save(assignment);
  }

  async findActiveByParkingLot(parkingLotId: number) {
    const assignments = await this.assignmentRepository
      .createQueryBuilder('assignment')
      .leftJoinAndSelect(Car, 'car', 'car.id = assignment.carId')
      .where('assignment.parkingLotId = :parkingLotId', { parkingLotId })
      .andWhere('assignment.fechaSalida IS NULL')
      .select([
        'assignment.id',
        'assignment.carId',
        'assignment.parkingLotId',
        'assignment.fechaEntrada',
        'assignment.fechaSalida',
        'assignment.tarifa',
        'assignment.total',
        'car.placa',
      ])
      .getRawMany();
    // Mapear para que placa esté al mismo nivel
    return assignments.map(a => ({
      id: a.assignment_id,
      carId: a.assignment_carId,
      parkingLotId: a.assignment_parkingLotId,
      fechaEntrada: a.assignment_fechaEntrada,
      fechaSalida: a.assignment_fechaSalida,
      tarifa: a.assignment_tarifa,
      total: a.assignment_total,
      placa: a.car_placa,
    }));
  }

  async findFinishedByParkingLot(parkingLotId: number) {
    const assignments = await this.assignmentRepository
      .createQueryBuilder('assignment')
      .leftJoinAndSelect(Car, 'car', 'car.id = assignment.carId')
      .where('assignment.parkingLotId = :parkingLotId', { parkingLotId })
      .andWhere('assignment.fechaSalida IS NOT NULL')
      .select([
        'assignment.id',
        'assignment.carId',
        'assignment.parkingLotId',
        'assignment.fechaEntrada',
        'assignment.fechaSalida',
        'assignment.tarifa',
        'assignment.total',
        'car.placa',
      ])
      .getRawMany();
    return assignments.map(a => ({
      id: a.assignment_id,
      carId: a.assignment_carId,
      parkingLotId: a.assignment_parkingLotId,
      fechaEntrada: a.assignment_fechaEntrada,
      fechaSalida: a.assignment_fechaSalida,
      tarifa: a.assignment_tarifa,
      total: a.assignment_total,
      placa: a.car_placa,
    }));
  }
}
