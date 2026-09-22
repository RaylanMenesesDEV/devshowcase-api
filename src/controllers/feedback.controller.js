import { feedbackService } from "../services/feedbacks.service.js";
import { validateFeedback } from "../dtos/feedback.dto.js";

export const feedbackController = {
  async getAll(req, res) {
    try {
      const feedbacks = await feedbackService.getAllFeedbacks();

      return res.status(200).json(feedbacks);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar os feedbacks",
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

      const feedback = await feedbackService.getFeedbackById(id);

      return res.status(200).json(feedback);
    } catch (error) {
      if (error.message === "Feedback não encontrado") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar o feedback",
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

      const feedbacks =
        await feedbackService.getFeedbacksByProjectId(projectId);

      return res.status(200).json(feedbacks);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar os feedbacks do projeto",
        error: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const errors = validateFeedback(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors,
        });
      }

      const feedback = await feedbackService.createFeedback(req.body);

      return res.status(201).json(feedback);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar o feedback",
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

      const errors = validateFeedback(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors,
        });
      }

      const feedback = await feedbackService.updateFeedback(
        id,
        req.body
      );

      return res.status(200).json(feedback);
    } catch (error) {
      if (error.message === "Feedback não encontrado") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar o feedback",
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

      await feedbackService.deleteFeedback(id);

      return res.status(204).send();
    } catch (error) {
      if (error.message === "Feedback não encontrado") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao excluir o feedback",
        error: error.message,
      });
    }
  },
};