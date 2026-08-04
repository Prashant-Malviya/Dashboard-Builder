import { Rnd } from "react-rnd";
import { Copy, Trash2, GripVertical, Type, Image as ImageIcon, BarChart3 } from "lucide-react";
import TextWidget from "../Widgets/TextWidget";
import ImageWidget from "../Widgets/ImageWidget";
import ChartWidget from "../Widgets/ChartWidget";
import { WIDGET_TYPES } from "../../utils/constants";

const WIDGET_COMPONENTS = {
  [WIDGET_TYPES.TEXT]: TextWidget,
  [WIDGET_TYPES.IMAGE]: ImageWidget,
  [WIDGET_TYPES.CHART]: ChartWidget,
};

const WIDGET_ICONS = {
  [WIDGET_TYPES.TEXT]: Type,
  [WIDGET_TYPES.IMAGE]: ImageIcon,
  [WIDGET_TYPES.CHART]: BarChart3,
};

const HEADER_HEIGHT = 28;

export default function WidgetRenderer({
  widget,
  isSelected,
  onSelect,
  onChange,
  onDuplicate,
  onDelete,
}) {
  const WidgetComponent = WIDGET_COMPONENTS[widget.type];
  const TypeIcon = WIDGET_ICONS[widget.type];


  const stopDrag = (e) => e.stopPropagation();

  return (
    <Rnd
      size={{ width: widget.width, height: widget.height }}
      position={{ x: widget.x, y: widget.y }}
      onDragStart={() => onSelect(widget.id)}
      onDragStop={(e, d) => onChange(widget.id, { x: d.x, y: d.y })}
      onResizeStart={() => onSelect(widget.id)}
      onResizeStop={(e, direction, ref, delta, position) => {
        onChange(widget.id, {
          width: parseFloat(ref.style.width),
          height: parseFloat(ref.style.height),
          ...position,
        });
      }}
      dragHandleClassName="widget-drag-handle"
      bounds="parent"
      minWidth={140}
      minHeight={100}
      className={isSelected ? "ring-2 ring-brand-400" : "ring-1 ring-gray-200"}
    >
      <div
        className="w-full h-full flex flex-col bg-white shadow-sm rounded-sm overflow-hidden"
        onMouseDown={() => onSelect(widget.id)}
      >

        <div
          className="widget-drag-handle flex items-center justify-between px-2 shrink-0 bg-gray-50 border-b border-gray-100 cursor-move select-none"
          style={{ height: HEADER_HEIGHT }}
        >
          <div className="flex items-center gap-1.5 text-gray-400">
            <GripVertical size={13} />
            <TypeIcon size={12} />
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onMouseDown={stopDrag}
              onClick={(e) => {
                stopDrag(e);
                onDuplicate(widget.id);
              }}
              title="Duplicate widget"
              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-brand-600 rounded"
            >
              <Copy size={12} />
            </button>
            <button
              type="button"
              onMouseDown={stopDrag}
              onClick={(e) => {
                stopDrag(e);
                onDelete(widget.id);
              }}
              title="Delete widget"
              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 rounded"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <WidgetComponent
            content={widget.content}
            isSelected={isSelected}
            onChange={(content) => onChange(widget.id, { content })}
          />
        </div>
      </div>
    </Rnd>
  );
}
