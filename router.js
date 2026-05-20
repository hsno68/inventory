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
  getItem,
  updateItem,
  deleteItem,
  verifyAdmin,
} from "./controller.js";

const router = Router();

router.get("/", getHomepage);

router.get("/classes", getClasses);
router.get("/classes/new", getNewClass);
router.get("/classes/:id", getClass);

router.post("/classes", createClass);
router.post("/classes/:id", updateClass);
router.post("/classes/:id/delete", verifyAdmin, deleteClass);

router.get("/stats", getStats);
router.get("/stats/new", getNewStat);
router.get("/stats/:id", getStat);

router.post("/stats", createStat);
router.post("/stats/:id", updateStat);
router.post("/stats/:id/delete", verifyAdmin, deleteStat);

router.get("/items", getItems);
router.get("/items/new", getNewItem);
router.get("/items/:id", getItem);

router.post("/items", createItem);
router.post("/items/:id", updateItem);
router.post("/items/:id/delete", verifyAdmin, deleteItem);

export default router;
