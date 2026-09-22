import { profileRepository } from "../repositories/profile.repository.js";

export const profileService = {
  async getAllProfiles() {
    return profileRepository.findAll();
  },

  async getProfileById(id) {
    const profile = await profileRepository.findById(id);

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    return profile;
  },

  async createProfile(data) {
    return profileRepository.create(data);
  },

  async updateProfile(id, data) {
    await this.getProfileById(id);

    return profileRepository.update(id, data);
  },

  async deleteProfile(id) {
    await this.getProfileById(id);

    return profileRepository.delete(id);
  },
};