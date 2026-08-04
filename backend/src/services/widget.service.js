const prisma = require("../config/db");
const ApiError = require("../utils/ApiError");

const createWidget = async (payload) => {
  const { dashboardId, type, x, y, width, height, content } = payload;

  const dashboard = await prisma.dashboard.findUnique({ where: { id: dashboardId } });
  if (!dashboard) throw new ApiError(404, "Dashboard not found");

  return prisma.widget.create({
    data: { dashboardId, type, x, y, width, height, content },
  });
};

const getWidgetById = async (id) => {
  const widget = await prisma.widget.findUnique({ where: { id } });
  if (!widget) throw new ApiError(404, "Widget not found");
  return widget;
};

const updateWidget = async (id, payload) => {
  await getWidgetById(id); // throws 404 if missing
  const { type, x, y, width, height, content } = payload;

  return prisma.widget.update({
    where: { id },
    data: {
      ...(type !== undefined && { type }),
      ...(x !== undefined && { x }),
      ...(y !== undefined && { y }),
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(content !== undefined && { content }),
    },
  });
};

const deleteWidget = async (id) => {
  await getWidgetById(id);
  return prisma.widget.delete({ where: { id } });
};

const duplicateWidget = async (id) => {
  const original = await getWidgetById(id);

  return prisma.widget.create({
    data: {
      dashboardId: original.dashboardId,
      type: original.type,
      x: original.x + 20, 
      y: original.y + 20,
      width: original.width,
      height: original.height,
      content: original.content,
    },
  });
};

module.exports = {
  createWidget,
  getWidgetById,
  updateWidget,
  deleteWidget,
  duplicateWidget,
};
