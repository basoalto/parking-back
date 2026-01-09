"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParkinglotDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_parkinglot_dto_1 = require("./create-parkinglot.dto");
class UpdateParkinglotDto extends (0, mapped_types_1.PartialType)(create_parkinglot_dto_1.CreateParkinglotDto) {
}
exports.UpdateParkinglotDto = UpdateParkinglotDto;
//# sourceMappingURL=update-parkinglot.dto.js.map