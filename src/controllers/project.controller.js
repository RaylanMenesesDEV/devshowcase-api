import { projectService } from "../services/projects.service.js";
import { validateProject } from "../dtos/project.dto.js";

export const projectController = {
  async getAll(req, res) {
    try {
      const projects = await projectService.getAllProjects();

      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar os projetos",
        error: error.message,
      });
    }
  },

  async getById(req, res) {
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
      if (error.message === "Projeto não encontrado") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar o projeto",
        error: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const errors = validateProject(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors,
        });
      }

      const project = await projectService.createProject(req.body);

      return res.status(201).json(project);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar o projeto",
        error: error.message,
      });
    }
  },

  async update(req, res) {
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

      return res.status(200).json(project);
    } catch (error) {
      if (error.message === "Projeto não encontrado") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar o projeto",
        error: error.message,
      });
    }
  },

  async delete(req, res) {
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
      if (error.message === "Projeto não encontrado") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao excluir o projeto",
        error: error.message,
      });
    }
  },
};