import { feedbackRepository } from "../repositories/feedback.repository.js";
import { projectRepository } from "../repositories/project.repository.js";

export const feedbackService = {
  async getAllFeedbacks() {
    return feedbackRepository.findAll();
  },

  async getFeedbackById(id) {
    const feedback = await feedbackRepository.findById(id);

    if (!feedback) {
      throw new Error("Feedback não encontrado");
    }

    return feedback;
  },

  async getFeedbacksByProjectId(projectId) {
    return feedbackRepository.findByProjectId(projectId);
  },

  async createFeedback(data) {
  const feedback = await feedbackRepository.create(data);

  const averageRating =
    await feedbackRepository.getAverageRatingByProjectId(
      Number(data.projectId)
    );

  await projectRepository.updateAverageRating(
    Number(data.projectId),
    averageRating
  );

  return {
    ...feedback,
    averageRating,
  };
},

  async updateFeedback(id, data) {
    await this.getFeedbackById(id);

    return feedbackRepository.update(id, data);
  },

  async deleteFeedback(id) {
    await this.getFeedbackById(id);

    return feedbackRepository.delete(id);
  },
};