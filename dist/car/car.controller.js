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
exports.CarController = void 0;
const assign_person_to_car_dto_1 = require("./dto/assign-person-to-car.dto");
const prize_service_1 = require("../prize/prize.service");
const common_1 = require("@nestjs/common");
const car_service_1 = require("./car.service");
const create_car_dto_1 = require("./dto/create-car.dto");
let CarController = class CarController {
    carService;
    prizeService;
    constructor(carService, prizeService) {
        this.carService = carService;
        this.prizeService = prizeService;
    }
    async redeemPrize(placa, prizeId) {
        const prize = await this.prizeService.findOne(+prizeId);
        if (!prize)
            throw new Error('Prize not found');
        return this.carService.redeemPrize(placa, prize);
    }
    async assignPersonToCar(assignPersonToCarDto) {
        return this.carService.assignPersonToCar(assignPersonToCarDto);
    }
    create(createCarDto) {
        return this.carService.create(createCarDto);
    }
    findAll() {
        return this.carService.findAll();
    }
    findOne(id) {
        return this.carService.findOne(+id);
    }
    update(id, updateCarDto) {
        return this.carService.update(+id, updateCarDto);
    }
    remove(id) {
        return this.carService.remove(+id);
    }
    findByPlate(placa) {
        return this.carService.findByPlate(placa);
    }
};
exports.CarController = CarController;
__decorate([
    (0, common_1.Post)('redeem/:placa/:prizeId'),
    __param(0, (0, common_1.Param)('placa')),
    __param(1, (0, common_1.Param)('prizeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "redeemPrize", null);
__decorate([
    (0, common_1.Post)('assign-person'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_person_to_car_dto_1.AssignPersonToCarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "assignPersonToCar", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_car_dto_1.CreateCarDto]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('plate/:placa'),
    __param(0, (0, common_1.Param)('placa')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "findByPlate", null);
exports.CarController = CarController = __decorate([
    (0, common_1.Controller)('car'),
    __metadata("design:paramtypes", [car_service_1.CarService,
        prize_service_1.PrizeService])
], CarController);
//# sourceMappingURL=car.controller.js.map