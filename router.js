import { Router } from "express";
import {
  getHomepage,
  getNewClass,
  getNewStat,
  getNewItem,
  createClass,
  getClass,
  getClasses,
  updateClass,
  deleteClass,
  createStat,
  getStat,
  getStats,
  updateStat,
  deleteStat,
  createItem,
  getItems,
} from "./controller.js";

const router = Router();

router.get("/", getHomepage);

router.get("/classes", getClasses);
router.get("/classes/new", getNewClass);
router.get("/classes/:className", getClass);

router.post("/classes", createClass);
router.post("/classes/:className", updateClass);
router.post("/classes/:className/delete", deleteClass);

router.get("/stats", getStats);
router.get("/stats/new", getNewStat);
router.get("/stats/:statName", getStat);

router.post("/stats", createStat);
router.post("/stats/:statName", updateStat);
router.post("/stats/:statName/delete", deleteStat);

router.get("/items", getItems);
router.get("/items/new", getNewItem);

router.post("/items", createItem);

export default router;
