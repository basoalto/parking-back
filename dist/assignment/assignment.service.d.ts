import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { ParkingLot } from '../parkinglot/entities/parkinglot.entity';
import { Car } from '../car/entities/car.entity';
export declare class AssignmentService {
    private assignmentRepository;
    private parkingLotRepository;
    private carRepository;
    constructor(assignmentRepository: Repository<Assignment>, parkingLotRepository: Repository<ParkingLot>, carRepository: Repository<Car>);
    create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment>;
    findAll(): Promise<Assignment[]>;
    findOne(id: number): Promise<Assignment | null>;
    update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<Assignment | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    createByPlate(placa: string, parkingLotId: number): Promise<Assignment>;
    findActiveByParkingLot(parkingLotId: number): Promise<{
        id: any;
        carId: any;
        parkingLotId: any;
        fechaEntrada: any;
        fechaSalida: any;
        tarifa: any;
        total: any;
        placa: any;
    }[]>;
    findFinishedByParkingLot(parkingLotId: number): Promise<{
        id: any;
        carId: any;
        parkingLotId: any;
        fechaEntrada: any;
        fechaSalida: any;
        tarifa: any;
        total: any;
        placa: any;
    }[]>;
}
