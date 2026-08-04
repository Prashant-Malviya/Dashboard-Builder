const prisma = require("../config/db");
const ApiError = require("../utils/ApiError");

const createDashboard = async (name) => {
  return prisma.dashboard.create({ data: { name } });
};

const getDashboardById = async (id) => {
  const dashboard = await prisma.dashboard.findUnique({
    where: { id },
    include: { widgets: true },
  });

  if (!dashboard) {
    throw new ApiError(404, "Dashboard not found");
  }

  return dashboard;
};

const listDashboards = async () => {
  return prisma.dashboard.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, createdAt: true, _count: { select: { widgets: true } } },
  });
};

const deleteDashboard = async (id) => {
  await getDashboardById(id); // throws 404 if missing
  return prisma.dashboard.delete({ where: { id } });
};

module.exports = {
  createDashboard,
  getDashboardById,
  listDashboards,
  deleteDashboard,
};
