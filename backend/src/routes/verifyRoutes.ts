import { Router } from "express"; import { verify } from "../controllers/verifyController.js"; import { validateVerify } from "../middlewares/validation.js";
export const verifyRoutes=Router(); verifyRoutes.post("/verify",validateVerify,verify);
