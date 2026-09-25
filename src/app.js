import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.js";
import profileRoutes from "./routes/profile.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import technologyRoutes from "./routes/technologies.routes.js";
import projectTechnologyRoutes from "./routes/projectTechnology.routes.js";
import feedbackRoutes from "./routes/feedbacks.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({
    message: "DevShowcase API funcionando!",
  });
});

app.use("/api/profiles", profileRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/technologies", technologyRoutes);

app.use("/api/project-technologies", projectTechnologyRoutes);

app.use("/api/feedbacks", feedbackRoutes);

app.use(errorMiddleware);

export default app;