<<<<<<< HEAD
/** biome-ignore-all lint/complexity/noUselessTernary: <explanation> */
=======
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { AppError } from "../../utils/AppError";
import type { IRequestUser } from "./auth.interface";
<<<<<<< HEAD
import config from "../../config";
=======
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8

const registerUser = catchAsync(async (req: Request, res: Response) => {
  //zod sanitization

  const payload = req.body;

  await authServices.registerUserInDb(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Registration successfull otp send to verify email now verify it",
    data: null,
  });
});

//verify otp and send accesstoken refresh token
const verifyUserEmail = catchAsync(async (req: Request, res: Response) => {



  const payload = req.body;

  const result = await authServices.verifyOtpAndCreateUser(payload);

  const { accessToken, refreshToken, createdUser } = result;
  //cookie set
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
<<<<<<< HEAD
    secure: config.node_env==="development" ? false : true ,
    sameSite:config.node_env==="development" ? "lax" : "none",
=======
    secure: false,
    sameSite: "none",
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
<<<<<<< HEAD
    secure: config.node_env==="development" ? false : true ,
    sameSite:config.node_env==="development" ? "lax" : "none",

=======
    secure: false,
    sameSite: "none",
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: { accessToken, refreshToken, createdUser },
  });
});

//login user

<<<<<<< HEAD
const resendOtp = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  await authServices.resendOtpForRegistration(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OTP resent successfully",
    data: null,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {

console.log(config.node_env,'this is node env here login')
=======
const loginUser = catchAsync(async (req: Request, res: Response) => {

>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8

  const payload = req.body;

  const { accessToken, refreshToken } = await authServices.loginUser(payload);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
<<<<<<< HEAD
    secure: config.node_env==="development" ? false : true ,
    sameSite:config.node_env==="development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
   
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env==="development" ? false : true ,
    sameSite:config.node_env==="development" ? "lax" : "none",

=======
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Login successfull",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

//refresh token to get new accesstoken

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  if (!req.cookies.refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is missing");
  }
  const result = await authServices.refreshToken(req.cookies.refreshToken);
  const { accessToken, refreshToken: newRefreshToken } = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
<<<<<<< HEAD
    secure: config.node_env==="development" ? false : true ,
    sameSite:config.node_env==="development" ? "lax" : "none",

    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
   
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: config.node_env==="development" ? false : true ,
    sameSite:config.node_env==="development" ? "lax" : "none",

=======
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken,
    },
  });
});

//google login

const googleLoginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authServices.googleLogin(payload);

  const { accessToken, refreshToken } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
<<<<<<< HEAD
    secure: config.node_env==="development" ? false : true ,
    sameSite:config.node_env==="development" ? "lax" : "none",
=======
    secure: false,
    sameSite: "none",
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
    maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
<<<<<<< HEAD
    secure: config.node_env==="development" ? false : true ,
       sameSite:config.node_env==="development" ? "lax" : "none",

=======
    secure: false,
    sameSite: "none",
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Google Login successfull",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

//get me

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as unknown as IRequestUser;

  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "User information is missing in the request"
    );
  }

  const result = await authServices.getMe(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});

<<<<<<< HEAD
const getTechnicianCount = catchAsync(async (_req: Request, res: Response) => {
  const result = await authServices.getTechnicianCount();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Technician count fetched successfully",
    data: result,
  });
});

=======
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
//update user profile controller

const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const profileImageFile = req.file as Express.Multer.File | undefined;

  const payload = JSON.parse(req.body.data);
  const userId = req.user?.userId;

  const result = await authServices.updateUserProfileInDb(
    payload,
    profileImageFile ?? null,
    userId as string
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

<<<<<<< HEAD
const logout=catchAsync(async(req:Request,res:Response)=>{
	res.clearCookie("accessToken")
	res.clearCookie("refreshToken")
	sendResponse(res,{
		statusCode:httpStatus.OK,
		success:true,
		message:"Log out sucessfull",
		data:null
	})
})

export const authController = {
  registerUser,
  verifyUserEmail,
  resendOtp,
=======
export const authController = {
  registerUser,
  verifyUserEmail,
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
  loginUser,
  refreshToken,
  googleLoginUser,
  getMe,
<<<<<<< HEAD
  getTechnicianCount,
  updateUserProfile,
  logout
=======
  updateUserProfile,
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
};
