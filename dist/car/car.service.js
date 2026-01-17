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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const car_entity_1 = require("./entities/car.entity");
const person_entity_1 = require("../person/entities/person.entity");
let CarService = class CarService {
    carRepository;
    personRepository;
    constructor(carRepository, personRepository) {
        this.carRepository = carRepository;
        this.personRepository = personRepository;
    }
    async assignPersonToCar(assignPersonToCarDto) {
        const { carId, rut } = assignPersonToCarDto;
        let car = await this.carRepository.findOne({ where: { id: carId }, relations: ['person'] });
        if (!car) {
            car = this.carRepository.create({ id: carId, placa: '', marca: '', modelo: '', color: '', puntaje: 0 });
            await this.carRepository.save(car);
        }
        let person = await this.personRepository.findOne({ where: { rut } });
        if (!person) {
            person = this.personRepository.create({ rut, nombre: rut });
            await this.personRepository.save(person);
        }
        car.person = person;
        await this.carRepository.save(car);
        return car;
    }
    create(createCarDto) {
        return 'This action adds a new car';
    }
    findAll() {
        return `This action returns all car`;
    }
    findOne(id) {
        return `This action returns a #${id} car`;
    }
    async update(id, updateCarDto) {
        await this.carRepository.update(id, updateCarDto);
        return this.carRepository.findOneBy({ id });
    }
    async findByPlate(placa) {
        return this.carRepository.findOneBy({ placa });
    }
    remove(id) {
        return `This action removes a #${id} car`;
    }
    async redeemPrize(placa, prize) {
        const car = await this.carRepository.findOneBy({ placa });
        if (!car)
            throw new Error('Car not found');
        if (car.puntaje < prize.pointsRequired)
            throw new Error('Not enough points');
        car.puntaje -= prize.pointsRequired;
        await this.carRepository.save(car);
        return car;
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __param(1, (0, typeorm_1.InjectRepository)(person_entity_1.Person)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CarService);
//# sourceMappingURL=car.service.js.map