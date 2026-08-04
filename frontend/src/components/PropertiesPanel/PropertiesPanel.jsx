import { useRef } from "react";
import { Settings2, Upload, X } from "lucide-react";
import { uploadImage } from "../../api/imageApi";
import { WIDGET_TYPES } from "../../utils/constants";
import { CHART_TYPE_LABELS } from "../../utils/chartData";

function NumberField({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-1 text-xs text-gray-500">
      {label}
      <input
        type="number"
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
    </label>
  );
}


export default function PropertiesPanel({ widget, onChange, isOpen, onClose }) {
  const fileInputRef = useRef(null);

  const updateContent = (partial) =>
    widget && onChange(widget.id, { content: { ...widget.content, ...partial } });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await uploadImage(file);
    updateContent({ url: res.data.data.url });
  };

  const panelBody = !widget ? (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-2 p-4">
      <Settings2 size={28} />
      <p className="text-sm text-center">Select a widget to edit its properties</p>
    </div>
  ) : (
    <div className="flex flex-col gap-6 p-4 overflow-y-auto">
      <div>
        <h2 className="text-xs font-semibold uppercase text-gray-400 mb-3 tracking-wide">
          Position & Size
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="X" value={widget.x} onChange={(v) => onChange(widget.id, { x: v })} />
          <NumberField label="Y" value={widget.y} onChange={(v) => onChange(widget.id, { y: v })} />
          <NumberField
            label="Width"
            value={widget.width}
            onChange={(v) => onChange(widget.id, { width: v })}
          />
          <NumberField
            label="Height"
            value={widget.height}
            onChange={(v) => onChange(widget.id, { height: v })}
          />
        </div>
      </div>

      {widget.type === WIDGET_TYPES.TEXT && (
        <div>
          <h2 className="text-xs font-semibold uppercase text-gray-400 mb-3 tracking-wide">
            Text Formatting
          </h2>
          <label className="flex flex-col gap-1 text-xs text-gray-500">
            Font Size (px)
            <input
              type="range"
              min="12"
              max="48"
              value={widget.content.fontSize || 16}
              onChange={(e) => updateContent({ fontSize: Number(e.target.value) })}
            />
            <span className="text-gray-700 text-sm">{widget.content.fontSize || 16}px</span>
          </label>
          <p className="text-[11px] text-gray-400 mt-2">
            Use the toolbar inside the text box for bold, italic, and font color.
          </p>
        </div>
      )}

      {widget.type === WIDGET_TYPES.IMAGE && (
        <div>
          <h2 className="text-xs font-semibold uppercase text-gray-400 mb-3 tracking-wide">
            Image
          </h2>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-300
                       rounded-lg py-2.5 text-sm text-gray-600 hover:border-brand-400 hover:text-brand-600"
          >
            <Upload size={16} />
            Replace Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      )}

      {widget.type === WIDGET_TYPES.CHART && (
        <div>
          <h2 className="text-xs font-semibold uppercase text-gray-400 mb-3 tracking-wide">
            Chart
          </h2>

          <label className="flex flex-col gap-1 text-xs text-gray-500 mb-3">
            Chart Type
            <select
              value={widget.content.chartType || "bar"}
              onChange={(e) => updateContent({ chartType: e.target.value })}
              className="border border-gray-200 rounded-md px-2 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              {Object.entries(CHART_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs text-gray-500 mb-3">
            Chart Title
            <input
              type="text"
              value={widget.content.title}
              onChange={(e) => updateContent({ title: e.target.value })}
              className="border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </label>

          <button
            onClick={() =>
              updateContent({
                data: (widget.content.data || []).map(() => Math.floor(Math.random() * 90) + 10),
              })
            }
            className="w-full text-sm border border-gray-200 rounded-lg py-2 text-gray-600 hover:border-brand-400 hover:text-brand-600"
          >
            Randomize Values
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed md:static top-0 right-0 z-40 md:z-0 h-full w-72 shrink-0 bg-white border-l border-gray-200
                    flex flex-col transition-transform duration-200 ease-in-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 pb-0 md:hidden">
          <h2 className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
            Properties
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
        {panelBody}
      </aside>
    </>
  );
}
