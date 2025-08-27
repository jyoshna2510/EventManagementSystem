import express from "express";
import { registerForEvent, cancelRegistration } from "../controllers/registrationController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/:eventId", protect, registerForEvent);
router.delete("/:eventId", protect, cancelRegistration);

export default router;
