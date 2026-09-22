import { technologyRepository } from "../repositories/technology.repository.js";

export const technologyService = {
  async getAllTechnologies() {
    return technologyRepository.findAll();
  },

  async getTechnologyById(id) {
    const technology = await technologyRepository.findById(id);

    if (!technology) {
      throw new Error("Tecnologia não encontrada");
    }

    return technology;
  },

  async createTechnology(data) {
    return technologyRepository.create(data);
  },

  async updateTechnology(id, data) {
    await this.getTechnologyById(id);

    return technologyRepository.update(id, data);
  },

  async deleteTechnology(id) {
    await this.getTechnologyById(id);

    return technologyRepository.delete(id);
  },
};