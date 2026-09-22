import prisma from "../lib/prisma.js";

export const projectTechnologyRepository = {
  async findAll() {
    return prisma.projectTechnology.findMany({
      include: {
        project: true,
        technology: true,
      },
    });
  },

  async findByProjectId(projectId) {
    return prisma.projectTechnology.findMany({
      where: {
        projectId,
      },
      include: {
        technology: true,
      },
    });
  },

  async create(data) {
    return prisma.projectTechnology.create({
      data,
      include: {
        project: true,
        technology: true,
      },
    });
  },

  async delete(projectId, technologyId) {
    return prisma.projectTechnology.delete({
      where: {
        projectId_technologyId: {
          projectId,
          technologyId,
        },
      },
    });
  },
};