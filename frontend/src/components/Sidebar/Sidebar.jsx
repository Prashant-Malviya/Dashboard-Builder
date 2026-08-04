import { Type, Image as ImageIcon, BarChart3, X } from "lucide-react";
import { WIDGET_TYPES } from "../../utils/constants";

const items = [
  { type: WIDGET_TYPES.TEXT, label: "Add Text", icon: Type },
  { type: WIDGET_TYPES.IMAGE, label: "Add Image", icon: ImageIcon },
  { type: WIDGET_TYPES.CHART, label: "Add Chart", icon: BarChart3 },
];


export default function Sidebar({ onAddWidget, isOpen, onClose }) {
  const handleAdd = (type) => {
    onAddWidget(type);
    onClose?.();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-40 md:z-0 h-full w-64 md:w-56 shrink-0
                    bg-white border-r border-gray-200 flex flex-col p-4 gap-2
                    transition-transform duration-200 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-2 md:mb-0">
          <h2 className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
            Add Widget
          </h2>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {items.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => handleAdd(type)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700
                       hover:bg-brand-50 hover:text-brand-700 transition-colors"
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </aside>
    </>
  );
}
