const prisma = require("../config/db");
const ApiError = require("../utils/ApiError");


const saveLayout = async (dashboardId, widgets) => {
  const dashboard = await prisma.dashboard.findUnique({ where: { id: dashboardId } });
  if (!dashboard) throw new ApiError(404, "Dashboard not found");

  const incomingIds = widgets.filter((w) => w.id).map((w) => Number(w.id));

  return prisma.$transaction(async (tx) => {
    await tx.widget.deleteMany({
      where: {
        dashboardId,
        id: { notIn: incomingIds.length ? incomingIds : [-1] },
      },
    });

    const saved = [];
    for (const w of widgets) {
      const data = {
        dashboardId,
        type: w.type,
        x: w.x,
        y: w.y,
        width: w.width,
        height: w.height,
        content: w.content,
      };

      if (w.id) {
        saved.push(await tx.widget.update({ where: { id: Number(w.id) }, data }));
      } else {
        saved.push(await tx.widget.create({ data }));
      }
    }
    return saved;
  });
};

const getLayout = async (dashboardId) => {
  const dashboard = await prisma.dashboard.findUnique({ where: { id: dashboardId } });
  if (!dashboard) throw new ApiError(404, "Dashboard not found");

  return prisma.widget.findMany({
    where: { dashboardId },
    orderBy: { id: "asc" },
  });
};

module.exports = { saveLayout, getLayout };
