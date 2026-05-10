const prisma = require('../config/prisma');

const getAllLeads = async ({ search, status, sortBy, order, page, limit }) => {
  const skip = (page - 1) * limit;
  
  const where = {
    AND: [
      search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { notes: { contains: search, mode: 'insensitive' } },
        ],
      } : {},
      status ? { status } : {},
    ],
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { [sortBy]: order },
      skip,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    leads,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getLeadById = async (id) => {
  return await prisma.lead.findUnique({
    where: { id },
  });
};

const createLead = async (data) => {
  return await prisma.lead.create({
    data,
  });
};

const updateLead = async (id, data) => {
  return await prisma.lead.update({
    where: { id },
    data,
  });
};

const deleteLead = async (id) => {
  return await prisma.lead.delete({
    where: { id },
  });
};

const getStats = async () => {
  const [total, interested, converted, notInterested] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'Interested' } }),
    prisma.lead.count({ where: { status: 'Converted' } }),
    prisma.lead.count({ where: { status: 'NotInterested' } }),
  ]);

  const conversionRate = total > 0 ? (converted / total) * 100 : 0;

  return {
    total,
    interested,
    converted,
    notInterested,
    conversionRate: conversionRate.toFixed(2),
  };
};

module.exports = {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getStats,
};
