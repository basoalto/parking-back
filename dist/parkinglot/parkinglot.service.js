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
exports.ParkinglotService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const parkinglot_entity_1 = require("./entities/parkinglot.entity");
let ParkinglotService = class ParkinglotService {
    parkingLotRepository;
    constructor(parkingLotRepository) {
        this.parkingLotRepository = parkingLotRepository;
    }
    create(createParkinglotDto) {
        const parkingLot = this.parkingLotRepository.create(createParkinglotDto);
        return this.parkingLotRepository.save(parkingLot);
    }
    findAll() {
        return this.parkingLotRepository.find();
    }
    findOne(id) {
        return this.parkingLotRepository.findOneBy({ id });
    }
    update(id, updateParkinglotDto) {
        return this.parkingLotRepository.update(id, updateParkinglotDto);
    }
    remove(id) {
        return this.parkingLotRepository.delete(id);
    }
};
exports.ParkinglotService = ParkinglotService;
exports.ParkinglotService = ParkinglotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(parkinglot_entity_1.ParkingLot)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ParkinglotService);
//# sourceMappingURL=parkinglot.service.js.map