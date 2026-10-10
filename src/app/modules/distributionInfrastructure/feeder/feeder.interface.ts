
export interface IFeederInterface{
    name:string;
    code:string;
    voltageLevel:string;
<<<<<<< HEAD
=======
   
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
    substationId:string;
}

export interface IUpdateFeederPayload {
    name?: string;
    code?: string;
    voltageLevel?: string;
    substationId?: string;
    status?: "ACTIVE" | "INACTIVE";
}