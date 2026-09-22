import { Router } from "express";
import { technologyController } from "../controllers/technology.controller.js";

const router = Router();

router.get("/", technologyController.getAll);
router.get("/:id", technologyController.getById);
router.post("/", technologyController.create);
router.put("/:id", technologyController.update);
router.delete("/:id", technologyController.delete);

export default router;