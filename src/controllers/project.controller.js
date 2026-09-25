import { projectService } from "../services/projects.service.js";

import {
  validateProject,
  projectResponseDTO,
} from "../dtos/project.dto.js";

export const projectController = {
  async getAll(req, res, next) {
    try {
      const { technology, page, limit } = req.query;

      const result = await projectService.getAllProjects({
        technology,
        page,
        limit,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido",
        });
      }

      const project = await projectService.getProjectById(id);

      return res.status(200).json(project);
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    try {
      const errors = validateProject(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors,
        });
      }

      const project = await projectService.createProject(req.body);

      return res.status(201).json(projectResponseDTO(project));
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido",
        });
      }

      const errors = validateProject(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors,
        });
      }

      const project = await projectService.updateProject(id, req.body);

      return res.status(200).json(projectResponseDTO(project));
    } catch (error) {
      return next(error);
    }
  },

  async createFeedback(req, res, next) {
    try {
      const projectId = Number(req.params.id);

      if (Number.isNaN(projectId)) {
        return res.status(400).json({
          message: "ID do projeto inválido",
        });
      }

      const { author, comment, rating } = req.body;

      if (!author || typeof author !== "string") {
        return res.status(400).json({
          message: "O autor é obrigatório e deve ser um texto.",
        });
      }

      if (author.trim().length < 3) {
        return res.status(400).json({
          message: "O autor deve ter pelo menos 3 caracteres.",
        });
      }

      if (!comment || typeof comment !== "string") {
        return res.status(400).json({
          message: "O comentário é obrigatório e deve ser um texto.",
        });
      }

      if (comment.trim().length < 5) {
        return res.status(400).json({
          message: "O comentário deve ter pelo menos 5 caracteres.",
        });
      }

      if (
        rating === undefined ||
        !Number.isInteger(Number(rating)) ||
        Number(rating) < 1 ||
        Number(rating) > 5
      ) {
        return res.status(400).json({
          message:
            "A nota é obrigatória e deve ser um número inteiro entre 1 e 5.",
        });
      }

      const result = await projectService.createProjectFeedback(
        projectId,
        {
          author,
          comment,
          rating,
        }
      );

      return res.status(201).json({
        message: "Avaliação criada com sucesso",
        feedback: result.feedback,
        averageRating: result.averageRating,
      });
    } catch (error) {
      return next(error);
    }
  },

  async upvote(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          message: "ID do projeto inválido",
        });
      }

      const project = await projectService.upvoteProject(id);

      return res.status(200).json({
        message: "Upvote registrado com sucesso",
        upvotes: project.upvotes,
      });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido",
        });
      }

      await projectService.deleteProject(id);

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  },
};