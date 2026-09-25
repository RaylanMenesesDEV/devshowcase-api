import { Router } from "express";
import { projectController } from "../controllers/project.controller.js";

const router = Router();

router.get("/", projectController.getAll);
router.post("/:id/feedbacks", projectController.createFeedback);
router.put("/:id/upvote", projectController.upvote);
router.get("/:id", projectController.getById);
router.post("/", projectController.create);
router.put("/:id", projectController.update);
router.delete("/:id", projectController.delete);

export default router;