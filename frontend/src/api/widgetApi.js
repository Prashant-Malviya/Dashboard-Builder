import api from "./axios";

export const createWidget = (widget) => api.post("/widgets", widget);

export const updateWidget = (id, updates) => api.put(`/widgets/${id}`, updates);

export const deleteWidget = (id) => api.delete(`/widgets/${id}`);

export const duplicateWidget = (id) => api.post(`/widgets/${id}/duplicate`);
