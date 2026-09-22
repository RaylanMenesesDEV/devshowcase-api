import { profileService } from "../services/profiles.service.js";
import { validateProfile } from "../dtos/profile.dto.js";

export const profileController = {
  async getAll(req, res) {
    try {
      const profiles = await profileService.getAllProfiles();

      return res.status(200).json(profiles);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar os perfis",
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

      const profile = await profileService.getProfileById(id);

      return res.status(200).json(profile);
    } catch (error) {
      if (error.message === "Perfil não encontrado") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar o perfil",
        error: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const errors = validateProfile(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors,
        });
      }

      const profile = await profileService.createProfile(req.body);

      return res.status(201).json(profile);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar o perfil",
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

      const errors = validateProfile(req.body);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors,
        });
      }

      const profile = await profileService.updateProfile(id, req.body);

      return res.status(200).json(profile);
    } catch (error) {
      if (error.message === "Perfil não encontrado") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar o perfil",
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

      await profileService.deleteProfile(id);

      return res.status(204).send();
    } catch (error) {
      if (error.message === "Perfil não encontrado") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro ao excluir o perfil",
        error: error.message,
      });
    }
  },
};