import { projectTechnologyRepository } from "../repositories/projectTechnology.repository.js";

export const projectTechnologyService = {
  async getAll() {
    return projectTechnologyRepository.findAll();
  },

  async getByProjectId(projectId) {
    return projectTechnologyRepository.findByProjectId(projectId);
  },

  async addTechnologyToProject(projectId, technologyId) {
    return projectTechnologyRepository.create({
      project: {
        connect: {
          id: projectId,
        },
      },
      technology: {
        connect: {
          id: technologyId,
        },
      },
    });
  },

  async removeTechnologyFromProject(projectId, technologyId) {
    return projectTechnologyRepository.delete(projectId, technologyId);
  },
};