import { Router } from "express";
import { getHomepage } from "./controller.js";

const router = Router();

router.get("/", getHomepage);

export default router;
