import { projectTechnologyService } from "../services/projectTechnology.service.js";
import { projectTechnologyResponseDTO } from "../dtos/projectTechnology.dto.js";

export const projectTechnologyController = {
  async getAll(req, res) {
    try {
      const relationships = await projectTechnologyService.getAll();

      return res.status(200).json(relationships);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar os relacionamentos",
        error: error.message,
      });
    }
  },

  async getByProjectId(req, res) {
    try {
      const projectId = Number(req.params.projectId);

      if (Number.isNaN(projectId)) {
        return res.status(400).json({
          message: "ID do projeto inválido",
        });
      }

      const relationships =
        await projectTechnologyService.getByProjectId(projectId);

      return res.status(200).json(relationships);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar as tecnologias do projeto",
        error: error.message,
      });
    }
  },

  async create(req, res) {
  try {
    const projectId = Number(req.body.projectId);
    const technologyId = Number(req.body.technologyId);

    if (Number.isNaN(projectId) || Number.isNaN(technologyId)) {
      return res.status(400).json({
        message: "projectId e technologyId devem ser números válidos",
      });
    }

    const relationship =
      await projectTechnologyService.addTechnologyToProject(
        projectId,
        technologyId
      );

    return res
      .status(201)
      .json(projectTechnologyResponseDTO(relationship));
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao adicionar tecnologia ao projeto",
      error: error.message,
    });
  }
},

  async delete(req, res) {
    try {
      const projectId = Number(req.params.projectId);
      const technologyId = Number(req.params.technologyId);

      if (Number.isNaN(projectId) || Number.isNaN(technologyId)) {
        return res.status(400).json({
          message: "IDs inválidos",
        });
      }

      await projectTechnologyService.removeTechnologyFromProject(
        projectId,
        technologyId
      );

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao remover tecnologia do projeto",
        error: error.message,
      });
    }
  },
};