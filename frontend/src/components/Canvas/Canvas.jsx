import WidgetRenderer from "./WidgetRenderer";

export default function Canvas({
  widgets,
  selectedId,
  onSelect,
  onChange,
  onDuplicate,
  onDelete,
}) {
  return (
    <div
      className="flex-1 h-full overflow-auto bg-gray-100 p-4 md:p-8"
      onMouseDown={() => onSelect(null)} 
    >
      <div
        className="relative bg-white shadow-md mx-auto"
        style={{ width: 1000, height: 700 }}
        onMouseDown={(e) => {
        
          e.stopPropagation();
          if (e.target === e.currentTarget) onSelect(null);
        }}
      >
        {widgets.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm text-center px-6 pointer-events-none">
            Add a widget from the left sidebar to get started
          </p>
        )}

        {widgets.map((widget) => (
          <WidgetRenderer
            key={widget.id}
            widget={widget}
            isSelected={widget.id === selectedId}
            onSelect={onSelect}
            onChange={onChange}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
