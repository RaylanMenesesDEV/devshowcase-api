import { projectRepository } from "../repositories/project.repository.js";
import { feedbackRepository } from "../repositories/feedback.repository.js";
import { AppError } from "../middlewares/AppError.js";

export const projectService = {
  async getAllProjects({ technology, page = 1, limit = 10 } = {}) {
  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.min(
    Math.max(Number(limit) || 10, 1),
    100
  );

  return projectRepository.findAll({
    technology,
    page: pageNumber,
    limit: limitNumber,
  });
},

  async getProjectById(id) {
    const project = await projectRepository.findById(id);

    if (!project) {
  throw new AppError("Projeto não encontrado", 404);
}

    return project;
  },

  async createProject(data) {
    return projectRepository.create(data);
  },

  async updateProject(id, data) {
    await this.getProjectById(id);

    return projectRepository.update(id, data);
  },

async createProjectFeedback(projectId, data) {
  const project = await this.getProjectById(projectId);

  const feedback = await feedbackRepository.create({
    author: data.author,
    comment: data.comment,
    rating: Number(data.rating),
    projectId,
  });

  const averageRating =
    await feedbackRepository.getAverageRatingByProjectId(projectId);

  await projectRepository.updateAverageRating(
    projectId,
    averageRating
  );

  return {
    feedback,
    averageRating,
    project,
  };
},

async upvoteProject(id) {
  await this.getProjectById(id);

  return projectRepository.incrementUpvotes(id);
},

  async deleteProject(id) {
    await this.getProjectById(id);

    return projectRepository.delete(id);
  },
};