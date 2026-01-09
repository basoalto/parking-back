"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkinglotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const parkinglot_service_1 = require("./parkinglot.service");
const parkinglot_controller_1 = require("./parkinglot.controller");
const parkinglot_entity_1 = require("./entities/parkinglot.entity");
let ParkinglotModule = class ParkinglotModule {
};
exports.ParkinglotModule = ParkinglotModule;
exports.ParkinglotModule = ParkinglotModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([parkinglot_entity_1.ParkingLot])],
        controllers: [parkinglot_controller_1.ParkinglotController],
        providers: [parkinglot_service_1.ParkinglotService],
        exports: [typeorm_1.TypeOrmModule],
    })
], ParkinglotModule);
//# sourceMappingURL=parkinglot.module.js.map