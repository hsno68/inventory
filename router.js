import { Router } from "express";
import {
  getHomepage,
  getClasses,
  getNewClass,
  createNewClass,
  getStats,
  getNewStat,
  createNewStat,
} from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/classes", getClasses);
router.get("/classes/new", getNewClass);
router.get("/stats/new", getNewStat);
router.get("/stats", getStats);

router.post("/classes", createNewClass);
router.post("/stats", createNewStat);

export default router;
