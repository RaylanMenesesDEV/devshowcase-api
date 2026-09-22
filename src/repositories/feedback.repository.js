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

  async delete(id) {
    return prisma.feedback.delete({
      where: {
        id,
      },
    });
  },
};