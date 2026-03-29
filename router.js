import { Router } from "express";
import {
  getHomepage,
  getClasses,
  getNewClass,
  createNewClass,
  getStats,
  getNewStat,
  createNewStat,
  getItems,
  getNewItem,
  createNewItem,
} from "./controller.js";

const router = Router();

router.get("/", getHomepage);
router.get("/classes", getClasses);
router.get("/classes/new", getNewClass);
router.get("/stats", getStats);
router.get("/stats/new", getNewStat);
router.get("/items", getItems);
router.get("/items/new", getNewItem);

router.post("/classes", createNewClass);
router.post("/stats", createNewStat);
router.post("/items", createNewItem);

export default router;
