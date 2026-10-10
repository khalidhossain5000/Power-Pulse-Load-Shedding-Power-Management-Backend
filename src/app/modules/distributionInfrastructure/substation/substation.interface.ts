import type { InfrastructureStatus } from "../../../../generated/prisma/enums";

export interface ISubstationPayload{
    name:string;
    code:string;
    capacity:string;
    location:string;
    zoneId:string;
<<<<<<< HEAD
=======
    status?:InfrastructureStatus;
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
}

export interface IUpdateSubstationPayload {
    name?: string;
    code?: string;
    capacity?: string;
    location?: string;
    zoneId?: string;
    status?: InfrastructureStatus;
}