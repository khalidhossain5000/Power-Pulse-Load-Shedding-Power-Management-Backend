import z from "zod";

export const createZoneZodSchema = z.object({
    name: z.string("Name is not a string").min(5, "Name should minimum have 5 char").max(100, "Name should not be more than 100 chars"),
    code: z.string("Not a string").min(5, "Code should minimum have 5 char").max(10, "Max 10 chars"),
    description: z.string("Not a string").min(5, "Description should minimum have 5 char").max(150, "Max 150 chars"),
<<<<<<< HEAD
  
=======
    status: z.enum(["ACTIVE", "INACTIVE"]),
>>>>>>> bbae1d371764ee750656edc838ec5bc2df4db4c8
})

export const updateZoneZodSchema = createZoneZodSchema.partial().refine(
    (payload) => Object.keys(payload).length > 0,
    "At least one zone field is required for update",
)



