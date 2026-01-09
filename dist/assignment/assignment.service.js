"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assignment_entity_1 = require("./entities/assignment.entity");
const parkinglot_entity_1 = require("../parkinglot/entities/parkinglot.entity");
const car_entity_1 = require("../car/entities/car.entity");
let AssignmentService = class AssignmentService {
    assignmentRepository;
    parkingLotRepository;
    carRepository;
    constructor(assignmentRepository, parkingLotRepository, carRepository) {
        this.assignmentRepository = assignmentRepository;
        this.parkingLotRepository = parkingLotRepository;
        this.carRepository = carRepository;
    }
    async create(createAssignmentDto) {
        const parkingLot = await this.parkingLotRepository.findOneBy({ id: createAssignmentDto.parkingLotId });
        if (!parkingLot)
            throw new Error('ParkingLot not found');
        const fechaEntrada = new Date();
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
    findOne(id) {
        return this.assignmentRepository.findOneBy({ id });
    }
    async update(id, updateAssignmentDto) {
        const assignment = await this.assignmentRepository.findOneBy({ id });
        if (!assignment)
            return null;
        if (updateAssignmentDto.fechaSalida) {
            const fechaSalida = new Date(updateAssignmentDto.fechaSalida);
            assignment.fechaSalida = fechaSalida;
            const ms = assignment.fechaSalida.getTime() - assignment.fechaEntrada.getTime();
            const minutos = Math.floor(ms / (1000 * 60));
            const parkingLot = await this.parkingLotRepository.findOneBy({ id: assignment.parkingLotId });
            if (!parkingLot)
                throw new Error('ParkingLot not found');
            if (minutos <= 10) {
                assignment.total = parkingLot.tarifaMinima;
            }
            else {
                assignment.total = minutos * assignment.tarifa;
            }
            const puntos = Math.floor(minutos / 10);
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
    async remove(id) {
        const result = await this.assignmentRepository.delete(id);
        return { deleted: !!result.affected && result.affected > 0 };
    }
    async createByPlate(placa, parkingLotId) {
        let car = await this.carRepository.findOneBy({ placa });
        if (!car) {
            car = this.carRepository.create({ placa, marca: '', modelo: '', color: '' });
            car = await this.carRepository.save(car);
        }
        const parkingLot = await this.parkingLotRepository.findOneBy({ id: parkingLotId });
        if (!parkingLot)
            throw new Error('ParkingLot not found');
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
    async findActiveByParkingLot(parkingLotId) {
        const assignments = await this.assignmentRepository
            .createQueryBuilder('assignment')
            .leftJoinAndSelect(car_entity_1.Car, 'car', 'car.id = assignment.carId')
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
    async findFinishedByParkingLot(parkingLotId) {
        const assignments = await this.assignmentRepository
            .createQueryBuilder('assignment')
            .leftJoinAndSelect(car_entity_1.Car, 'car', 'car.id = assignment.carId')
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
};
exports.AssignmentService = AssignmentService;
exports.AssignmentService = AssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assignment_entity_1.Assignment)),
    __param(1, (0, typeorm_1.InjectRepository)(parkinglot_entity_1.ParkingLot)),
    __param(2, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AssignmentService);
//# sourceMappingURL=assignment.service.js.map