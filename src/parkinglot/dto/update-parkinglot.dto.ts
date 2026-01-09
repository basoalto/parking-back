import { PartialType } from '@nestjs/mapped-types';
import { CreateParkinglotDto } from './create-parkinglot.dto';

export class UpdateParkinglotDto extends PartialType(CreateParkinglotDto) {}
