import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";
import Canvas from "../Canvas/Canvas";
import PropertiesPanel from "../PropertiesPanel/PropertiesPanel";
import AddChartModal from "../Modals/AddChartModal";
import useDashboard from "../../hooks/useDashboard";
import useWidgets from "../../hooks/useWidgets";
import { WIDGET_TYPES } from "../../utils/constants";

export default function Builder({ dashboardId, onBack }) {
  const { dashboard, loading, saving, persistLayout } = useDashboard(dashboardId);
  const {
    widgets,
    setAllWidgets,
    addWidget,
    updateWidget,
    removeWidget,
    duplicateWidgetLocal,
    selectedId,
    setSelectedId,
    selectedWidget,
  } = useWidgets([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [chartModalOpen, setChartModalOpen] = useState(false);

  
  useEffect(() => {
    if (dashboard?.widgets) setAllWidgets(dashboard.widgets);
  }, [dashboard, setAllWidgets]);


  useEffect(() => {
    if (selectedId) setPropertiesOpen(true);
  }, [selectedId]);

  const handleSidebarAdd = (type) => {

    if (type === WIDGET_TYPES.CHART) {
      setChartModalOpen(true);
      return;
    }
    addWidget(type);
  };

  const handleCreateChart = (chartContent) => {
    addWidget(WIDGET_TYPES.CHART, chartContent);
    setChartModalOpen(false);
  };

  const handleDelete = (id) => {
    removeWidget(id);
    if (selectedId === id) setPropertiesOpen(false);
  };

  const handleSave = async () => {

    
    const payload = widgets.map(({ id, isNew, ...rest }) => ({
      ...(typeof id === "number" ? { id } : {}),
      ...rest,
    }));

    try {
      const saved = await persistLayout(payload);
      if (saved) setAllWidgets(saved);
      toast.success("Dashboard saved successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save dashboard");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="h-14 px-2 md:px-3 flex items-center text-gray-500 hover:text-brand-600 border-b border-r border-gray-200 bg-white shrink-0"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <Header
            dashboardName={dashboard?.name}
            saving={saving}
            onSave={handleSave}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
            onToggleProperties={() => setPropertiesOpen((v) => !v)}
          />
        </div>
      </div>

      <div className="flex flex-1 min-h-0 relative">
        <Sidebar
          onAddWidget={handleSidebarAdd}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <Canvas
          widgets={widgets}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onChange={updateWidget}
          onDuplicate={duplicateWidgetLocal}
          onDelete={handleDelete}
        />

        <PropertiesPanel
          widget={selectedWidget}
          onChange={updateWidget}
          isOpen={propertiesOpen}
          onClose={() => setPropertiesOpen(false)}
        />
      </div>

      {chartModalOpen && (
        <AddChartModal onClose={() => setChartModalOpen(false)} onCreate={handleCreateChart} />
      )}
    </div>
  );
}
