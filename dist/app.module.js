"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const parkinglot_module_1 = require("./parkinglot/parkinglot.module");
const car_module_1 = require("./car/car.module");
const assignment_module_1 = require("./assignment/assignment.module");
const parkinglot_entity_1 = require("./parkinglot/entities/parkinglot.entity");
const car_entity_1 = require("./car/entities/car.entity");
const assignment_entity_1 = require("./assignment/entities/assignment.entity");
const prize_module_1 = require("./prize/prize.module");
const prize_entity_1 = require("./prize/entities/prize.entity");
const person_entity_1 = require("./person/entities/person.entity");
const person_module_1 = require("./person/person.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '3306', 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [parkinglot_entity_1.ParkingLot, car_entity_1.Car, assignment_entity_1.Assignment, prize_entity_1.Prize, person_entity_1.Person],
                synchronize: false,
            }),
            parkinglot_module_1.ParkinglotModule,
            car_module_1.CarModule,
            assignment_module_1.AssignmentModule,
            prize_module_1.PrizeModule,
            person_module_1.PersonModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map