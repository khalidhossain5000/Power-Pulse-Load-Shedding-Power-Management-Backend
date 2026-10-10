import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./auth.validation";
import { Role } from "../../../generated/prisma/enums";
import { upload } from "../../lib/multer";

const router = Router();

<<<<<<< HEAD
router.post("/register", validateRequest(userValidation.registerUserValidationZodSchema), authController.registerUser)

router.post("/verify-email", authController.verifyUserEmail)

router.post("/resend-otp", validateRequest(userValidation.resendOtpSchema), authController.resendOtp)
router.post("/resen-otp", validateRequest(userValidation.resendOtpSchema), authController.resendOtp)

router.post("/login", validateRequest(userValidation.loginSchema), authController.loginUser)
=======
router.post("/register",validateRequest(userValidation.registerUserValidationZodSchema),authController.registerUser)

router.post("/verify-email",authController.verifyUserEmail)

router.post("/login",validateRequest(userValidation.loginSchema),authController.loginUser)
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8

router.post("/refresh-token", authController.refreshToken);

router.post("/google-login", authController.googleLoginUser);

<<<<<<< HEAD
router.post("/logout", authController.logout)

//update user profile info

router.patch("/update-profile", auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN), upload.single("profileImage"), authController.updateUserProfile)

router.get("/get-me", auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER), authController.getMe);

router.get("/technician-count", authController.getTechnicianCount);
=======

//update user profile info

router.patch("/update-profile",auth(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),upload.single("profileImage"),authController.updateUserProfile)

router.get("/get-me",auth(Role.ADMIN,Role.TECHNICIAN,Role.CUSTOMER), authController.getMe);
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8

export const AuthRoutes = router;