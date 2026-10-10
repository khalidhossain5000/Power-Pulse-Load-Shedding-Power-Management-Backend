import { Router } from "express";
import { auth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewares/validateRequest";
import { plannedOutageValidation } from "./planned-outage.validation";
import { PlannedOutageController } from "./planned-outage.controller";

const router = Router();

//--1 create planned outage admin only

router.post("/",auth(Role.ADMIN),validateRequest(plannedOutageValidation.createPlannedOutageZodSchema),PlannedOutageController.createPlannedOutage)
//-2 get all planned outage public can view

router.get("/",PlannedOutageController.getAllPlannedOutageSchdeule)

//-3 get planned outage details customer admin only
router.get("/:plannedOutageId",auth(Role.CUSTOMER,Role.ADMIN),PlannedOutageController.getPlannedOutageDetails)


//-4 more update status overall will done later for admin accoridong to business logic
router.patch("/:plannedOutageId",auth(Role.ADMIN),validateRequest(plannedOutageValidation.updatePlannedOutageZodSchema),PlannedOutageController.updatePlannedOutageSchedule)



export const PlannedOutageRoutes = router;
