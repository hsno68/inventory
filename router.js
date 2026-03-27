import { Router } from "express";
import { getHomepage, getClasses, getNewClass, createNewClass } from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/classes", getClasses);
router.get("/classes/new", getNewClass);

router.post("/classes", createNewClass);

export default router;
