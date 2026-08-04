import { useCallback, useState } from "react";
import { WIDGET_TYPES, DEFAULT_WIDGET_SIZE, DEFAULT_WIDGET_CONTENT } from "../utils/constants";
import { generateDummyChartData } from "../utils/chartData";


export default function useWidgets(initialWidgets = []) {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [selectedId, setSelectedId] = useState(null);

  const setAllWidgets = useCallback((list) => setWidgets(list), []);

  const addWidget = useCallback((type, customContent) => {
    const size = DEFAULT_WIDGET_SIZE[type];
    const content =
      customContent ??
      (type === WIDGET_TYPES.CHART ? generateDummyChartData() : DEFAULT_WIDGET_CONTENT[type]);

    const newWidget = {
      id: `tmp-${Date.now()}`, 
      type,
      x: 60,
      y: 60,
      ...size,
      content,
      isNew: true,
    };

    setWidgets((prev) => [...prev, newWidget]);
    setSelectedId(newWidget.id);
    return newWidget;
  }, []);

  const updateWidget = useCallback((id, updates) => {
    setWidgets((prev) => prev.map((w) => (w.id === id ? { ...w, ...updates } : w)));
  }, []);

  const removeWidget = useCallback(
    (id) => {
      setWidgets((prev) => prev.filter((w) => w.id !== id));
      setSelectedId((current) => (current === id ? null : current));
    },
    []
  );

  const duplicateWidgetLocal = useCallback((id) => {
    setWidgets((prev) => {
      const original = prev.find((w) => w.id === id);
      if (!original) return prev;
      const copy = {
        ...original,
        id: `tmp-${Date.now()}`,
        x: original.x + 20,
        y: original.y + 20,
        isNew: true,
      };
      return [...prev, copy];
    });
  }, []);

  const selectedWidget = widgets.find((w) => w.id === selectedId) || null;

  return {
    widgets,
    setAllWidgets,
    addWidget,
    updateWidget,
    removeWidget,
    duplicateWidgetLocal,
    selectedId,
    setSelectedId,
    selectedWidget,
  };
}
