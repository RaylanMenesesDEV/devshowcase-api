import prisma from "../lib/prisma.js";

export const feedbackRepository = {
  async findAll() {
    return prisma.feedback.findMany({
      include: {
        project: true,
      },
    });
  },

  async findById(id) {
    return prisma.feedback.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });
  },

  async findByProjectId(projectId) {
    return prisma.feedback.findMany({
      where: {
        projectId,
      },
        include: {
        project: true,
      },
    });
  },

  async create(data) {
    return prisma.feedback.create({
      data,
      include: {
        project: true,
      },
    });
  },

  async update(id, data) {
    return prisma.feedback.update({
      where: {
        id,
      },
      data,
      include: {
        project: true,
      },
    });
  },

    async getAverageRatingByProjectId(projectId) {
    const result = await prisma.feedback.aggregate({
      where: {
        projectId,
        rating: {
          not: null,
        },
      },
      _avg: {
        rating: true,
      },
    });

    return result._avg.rating ?? 0;
  },

  async delete(id) {
    return prisma.feedback.delete({
      where: {
        id,
      },
    });
  },
};