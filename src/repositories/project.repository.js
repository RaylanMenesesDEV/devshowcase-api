import prisma from "../lib/prisma.js";

export const projectRepository = {
  async findAll({ technology, page = 1, limit = 10 } = {}) {
  const skip = (page - 1) * limit;

  const where = technology
    ? {
        technologies: {
          some: {
            technology: {
              name: {
                contains: technology,
                mode: "insensitive",
              },
            },
          },
        },
      }
    : {};

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip,
      take: limit,
      include: {
        profile: true,
        technologies: {
          include: {
            technology: true,
          },
        },
        feedbacks: true,
      },
      orderBy: {
        id: "desc",
      },
    }),

    prisma.project.count({
      where,
    }),
  ]);

  return {
    projects,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
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

async updateAverageRating(id, averageRating) {
  return prisma.project.update({
    where: {
      id,
    },
    data: {
      averageRating,
    },
  });
},

async incrementUpvotes(id) {
  return prisma.project.update({
    where: {
      id,
    },
    data: {
      upvotes: {
        increment: 1,
      },
    },
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