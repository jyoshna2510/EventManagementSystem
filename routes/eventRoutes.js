import express from "express";
import { createEvent, getEvents, filterEvents, approveEvent } from "../controllers/eventController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", getEvents);
router.get("/filter", filterEvents);
router.put("/:id/approve", protect, admin, approveEvent);

export default router;
