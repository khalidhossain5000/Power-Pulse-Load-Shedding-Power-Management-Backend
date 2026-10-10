import { Router } from "express";
import { auth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewares/validateRequest";
import { OutageController } from "./outage.controller";
import { outageValidation } from "./outage.validation";

const router = Router();

//--create unexpected outage for customer
// createOutageZodSchema
router.post("/", auth(Role.CUSTOMER), validateRequest(outageValidation.createOutageZodSchema), OutageController.createOutage)
//--get all unexpected outage for admin manage
router.get("/", auth(Role.ADMIN), OutageController.getAllOutageForAdminManage)

<<<<<<< HEAD
//--public outage counts
router.get("/counts", OutageController.getOutageCounts)
=======
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8

//--get my (currentuser addeda ll ) outage

router.get("/my-outage", auth(Role.CUSTOMER), OutageController.getCurrentUserAddedOutages)
<<<<<<< HEAD

//--get all outages assigned to the current technician
router.get("/my-assigned-outages", auth(Role.TECHNICIAN), OutageController.getCurrentTechnicianAssignedOutages)

=======
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
//--get outage details
router.get("/:outageId", auth(Role.ADMIN, Role.CUSTOMER), OutageController.getOutageDetails)

//--update outage details for the reporting customer only
router.patch("/:outageId", auth(Role.CUSTOMER), validateRequest(outageValidation.updateOutageZodSchema), OutageController.updateOutage)

//--assign technician to solve this outage admin only
router.patch("/:outageId/assign-technician", auth(Role.ADMIN), OutageController.assignTechnicianToReportedOutage)


//update outage status accoding to flow
router.patch(
  "/:outageId/status",
  auth(Role.ADMIN, Role.TECHNICIAN),
  OutageController.updateOutageStatus
);

//delete outage

router.delete("/:outageId", auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER), OutageController.deleteOutage)

export const OutageRoutes = router;
