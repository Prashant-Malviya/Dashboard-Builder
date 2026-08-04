import { LayoutDashboard, Save, Loader2, Menu, Settings2 } from "lucide-react";

export default function Header({
  dashboardName,
  saving,
  onSave,
  onToggleSidebar,
  onToggleProperties,
}) {
  return (
    <header className="h-14 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-5 gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-500 hover:text-brand-600 p-1 shrink-0"
          title="Add widgets"
        >
          <Menu size={20} />
        </button>
        <LayoutDashboard size={20} className="text-brand-600 shrink-0" />
        <span className="font-semibold text-gray-800 truncate">
          {dashboardName || "Untitled Dashboard"}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onToggleProperties}
          className="md:hidden text-gray-500 hover:text-brand-600 p-1"
          title="Widget properties"
        >
          <Settings2 size={20} />
        </button>

        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60
                     text-white text-sm font-medium px-3 md:px-4 py-1.5 rounded-lg transition-colors"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span className="hidden sm:inline">{saving ? "Saving..." : "Save"}</span>
        </button>
      </div>
    </header>
  );
}
