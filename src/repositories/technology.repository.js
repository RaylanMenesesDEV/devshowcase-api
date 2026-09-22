import prisma from "../lib/prisma.js";

export const technologyRepository = {
  async findAll() {
    return prisma.technology.findMany({
      include: {
        projects: {
          include: {
            project: true,
          },
        },
      },
    });
  },

  async findById(id) {
    return prisma.technology.findUnique({
      where: {
        id,
      },
      include: {
        projects: {
          include: {
            project: true,
          },
        },
      },
    });
  },

  async create(data) {
    return prisma.technology.create({
      data,
    });
  },

  async update(id, data) {
    return prisma.technology.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id) {
    return prisma.technology.delete({
      where: {
        id,
      },
    });
  },
};