import { Router } from "express";
import { projectTechnologyController } from "../controllers/projectTechnology.controller.js";

const router = Router();

router.get("/", projectTechnologyController.getAll);

router.get(
  "/project/:projectId",
  projectTechnologyController.getByProjectId
);

router.post("/", projectTechnologyController.create);

router.delete(
  "/:projectId/:technologyId",
  projectTechnologyController.delete
);

export default router;