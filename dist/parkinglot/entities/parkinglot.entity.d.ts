import { Company } from '../../company/entities/company.entity';
export declare class ParkingLot {
    id: number;
    nombre: string;
    direccion: string;
    tarifaPorHora: number;
    tarifaMinima: number;
    company: Company;
    companyId: number;
}
