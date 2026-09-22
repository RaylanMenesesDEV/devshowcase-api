import prisma from "../lib/prisma.js";

export const projectRepository = {
  async findAll() {
    return prisma.project.findMany({
      include: {
        profile: true,
        technologies: {
          include: {
            technology: true,
          },
        },
        feedbacks: true,
      },
    });
  },

  async findById(id) {
    return prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        technologies: {
          include: {
            technology: true,
          },
        },
        feedbacks: true,
      },
    });
  },

  async create(data) {
    return prisma.project.create({
      data,
    });
  },

  async update(id, data) {
    return prisma.project.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id) {
    return prisma.project.delete({
      where: {
        id,
      },
    });
  },
};