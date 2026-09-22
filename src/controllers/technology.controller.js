import { technologyService } from "../services/technologies.service.js";
import {
  validateTechnology,
  technologyResponseDTO,
} from "../dtos/technology.dto.js";

export const technologyController = {
  async getAll(req, res) {
    try {
      const technologies = await technologyService.getAllTechnologies();

      return res.status(200).json(technologies);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar as tecnologias",
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

      const technology = await technologyService.getTechnologyById(id);

      return res.status(200).json(technology);
    } catch (error) {
      if (error.message === "Tecnologia não encontrada") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar a tecnologia",
        error: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const errors = validateTechnology(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors,
        });
      }

      const technology = await technologyService.createTechnology(req.body);
return res.status(201).json(technologyResponseDTO(technology));
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar a tecnologia",
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

      const errors = validateTechnology(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors,
        });
      }

      const technology = await technologyService.updateTechnology(
        id,
        req.body
      );

     return res.status(200).json(technologyResponseDTO(technology));
    } catch (error) {
      if (error.message === "Tecnologia não encontrada") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar a tecnologia",
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

      await technologyService.deleteTechnology(id);

      return res.status(204).send();
    } catch (error) {
      if (error.message === "Tecnologia não encontrada") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao excluir a tecnologia",
        error: error.message,
      });
    }
  },
};