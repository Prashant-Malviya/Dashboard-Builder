export const WIDGET_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  CHART: "chart",
};

export const DEFAULT_WIDGET_SIZE = {
  [WIDGET_TYPES.TEXT]: { width: 320, height: 160 },
  [WIDGET_TYPES.IMAGE]: { width: 300, height: 220 },
  [WIDGET_TYPES.CHART]: { width: 420, height: 300 },
};

export const DEFAULT_WIDGET_CONTENT = {
  [WIDGET_TYPES.TEXT]: { html: "<p>Click to edit this text...</p>", fontSize: 16 },
  [WIDGET_TYPES.IMAGE]: { url: "" },
  [WIDGET_TYPES.CHART]: { chartType: "bar", title: "New Chart", labels: [], data: [] },
};
