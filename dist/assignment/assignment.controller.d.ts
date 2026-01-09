import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentController {
    private readonly assignmentService;
    constructor(assignmentService: AssignmentService);
    create(createAssignmentDto: CreateAssignmentDto): Promise<import("./entities/assignment.entity").Assignment>;
    findAll(): Promise<import("./entities/assignment.entity").Assignment[]>;
    findOne(id: string): Promise<import("./entities/assignment.entity").Assignment | null>;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto): Promise<import("./entities/assignment.entity").Assignment | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    createByPlate(body: {
        placa: string;
        parkingLotId: number;
    }): Promise<import("./entities/assignment.entity").Assignment>;
    findActiveByParkingLot(parkingLotId: string): Promise<{
        id: any;
        carId: any;
        parkingLotId: any;
        fechaEntrada: any;
        fechaSalida: any;
        tarifa: any;
        total: any;
        placa: any;
    }[]>;
    findFinishedByParkingLot(parkingLotId: string): Promise<{
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
