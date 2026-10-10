import type { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { SubstationService } from "./substation.service";
import httpStatus from "http-status"
import { sendResponse } from "../../../utils/sendResponse";

const createSubstation = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await SubstationService.createSubstation(payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Substation created successfully",
        data: result,
    });
});


<<<<<<< HEAD
//get all  with pagination search filter
=======
//get all zone with pagination search filter
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
const getAllSubstation = catchAsync(async (req: Request, res: Response) => {


    const { data, meta } = await SubstationService.getAllSubstationFromDb(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Substation Retrieved Successfully",
        data: data,
        meta: meta,
    });
});

<<<<<<< HEAD
// details 
=======
//zone details 
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8

const getSubstationDetails = catchAsync(async (req: Request, res: Response) => {

    const substationId = req.params.substationId

    const result = await SubstationService.getSubstationDetails(substationId as string)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Substation details retrieved successfully",
        data: result,

    });
});

const updateSubstation = catchAsync(async (req: Request, res: Response) => {
    const substationId = req.params.substationId as string;
    const result = await SubstationService.updateSubstation(
        substationId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Substation updated successfully",
        data: result,
    });
});


export const SubstationController = {
    createSubstation,
    getAllSubstation,
    getSubstationDetails,
    updateSubstation,
}