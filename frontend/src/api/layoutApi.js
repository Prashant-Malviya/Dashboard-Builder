import api from "./axios";

export const saveLayout = (dashboardId, widgets) =>
  api.post("/layouts/save", { dashboardId, widgets });

export const getLayout = (dashboardId) => api.get(`/layouts/${dashboardId}`);
