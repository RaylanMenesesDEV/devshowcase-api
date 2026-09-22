import prisma from "../lib/prisma.js";

export const profileRepository = {
  async findAll() {
    return prisma.profile.findMany({
      include: {
        projects: true,
      },
    });
  },

  async findById(id) {
    return prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        projects: true,
      },
    });
  },

  async create(data) {
    return prisma.profile.create({
      data,
    });
  },

  async update(id, data) {
    return prisma.profile.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id) {
    return prisma.profile.delete({
      where: {
        id,
      },
    });
  },
};