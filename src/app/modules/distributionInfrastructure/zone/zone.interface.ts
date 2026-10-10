import type { InfrastructureStatus } from "../../../../generated/prisma/enums";

export interface ICreateZonePayload{
    name:string;
    code:string;
    description:string;
<<<<<<< HEAD
=======
    status:InfrastructureStatus
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
}

export interface IUpdateZonePayload {
    name?: string;
    code?: string;
    description?: string;
    status?: InfrastructureStatus;
}
