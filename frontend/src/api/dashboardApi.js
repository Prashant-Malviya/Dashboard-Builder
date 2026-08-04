import api from "./axios";

export const createDashboard = (name) => api.post("/dashboards", { name });

export const listDashboards = () => api.get("/dashboards");

export const getDashboard = (id) => api.get(`/dashboards/${id}`);

export const deleteDashboard = (id) => api.delete(`/dashboards/${id}`);
