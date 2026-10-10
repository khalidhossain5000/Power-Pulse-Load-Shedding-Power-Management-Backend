import type { Role, UserStatus } from "../../../generated/prisma/enums";

export interface IRegisterUser {
    name:string;
    email:string;
    password:string;
    role:Role;
    status:UserStatus;
    profileImage?:string;
}



export interface IVerifyEmailPayload{
    email:string;
    otp:string
}

<<<<<<< HEAD
export interface IResendOtpPayload{
    email:string;
}
=======
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8


export interface ILoginUserPayload{
    email:string;
    password:string;
}


export interface IGoogleLoginPayload {
	idToken: string;
    role?:Role
}

export interface IRequestUser {
	userId: string;
	email: string;
	name: string;
	role: Role;
}

export interface IUpadteUserProfile{
	name:string;
}