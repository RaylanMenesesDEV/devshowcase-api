import { projectRepository } from "../repositories/project.repository.js";

export const projectService = {
  async getAllProjects() {
    return projectRepository.findAll();
  },

  async getProjectById(id) {
    const project = await projectRepository.findById(id);

    if (!project) {
      throw new Error("Projeto não encontrado");
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

  async deleteProject(id) {
    await this.getProjectById(id);

    return projectRepository.delete(id);
  },
};