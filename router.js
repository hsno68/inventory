import { Router } from "express";
import { getHomepage, getNewClass } from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/classes/new", getNewClass);

export default router;
