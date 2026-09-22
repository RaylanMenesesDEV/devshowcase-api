import { Router } from "express";
import { feedbackController } from "../controllers/feedback.controller.js";

const router = Router();

router.get("/", feedbackController.getAll);

router.get("/project/:projectId", feedbackController.getByProjectId);

router.get("/:id", feedbackController.getById);

router.post("/", feedbackController.create);

router.put("/:id", feedbackController.update);

router.delete("/:id", feedbackController.delete);

export default router;