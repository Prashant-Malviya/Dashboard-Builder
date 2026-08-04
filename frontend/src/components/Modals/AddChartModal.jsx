import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Modal from "../common/Modal";
import { CHART_TYPE_LABELS } from "../../utils/chartData";

const emptyRow = () => ({ label: "", value: "" });

export default function AddChartModal({ onClose, onCreate }) {
  const [chartType, setChartType] = useState("bar");
  const [title, setTitle] = useState("");
  const [rows, setRows] = useState([emptyRow(), emptyRow(), emptyRow()]);
  const [error, setError] = useState("");

  const updateRow = (index, field, value) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);
  const removeRow = (index) => setRows((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();

    const validRows = rows.filter(
      (r) => r.label.trim() !== "" && r.value !== "" && !isNaN(Number(r.value))
    );

    if (!title.trim()) return setError("Please enter a chart title");
    if (validRows.length === 0) return setError("Add at least one data point with a label and value");

    onCreate({
      chartType,
      title: title.trim(),
      labels: validRows.map((r) => r.label.trim()),
      data: validRows.map((r) => Number(r.value)),
    });
  };

  return (
    <Modal title="Add Chart" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-xs text-gray-500">
          Chart Type
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border border-gray-200 rounded-md px-2 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            {Object.entries(CHART_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-gray-500">
          Chart Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Monthly Revenue"
            className="border border-gray-200 rounded-md px-2 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </label>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Data Points</span>
            <button
              type="button"
              onClick={addRow}
              className="text-xs text-brand-600 flex items-center gap-1 hover:underline"
            >
              <Plus size={12} /> Add row
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {rows.map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={row.label}
                  onChange={(e) => updateRow(i, "label", e.target.value)}
                  placeholder="Label"
                  className="flex-1 min-w-0 border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
                <input
                  type="number"
                  value={row.value}
                  onChange={(e) => updateRow(i, "value", e.target.value)}
                  placeholder="Value"
                  className="w-20 shrink-0 border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  disabled={rows.length === 1}
                  className="shrink-0 text-gray-300 hover:text-red-500 disabled:opacity-30"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-brand-600 hover:bg-brand-700 text-white rounded-lg"
          >
            Add Chart
          </button>
        </div>
      </form>
    </Modal>
  );
}
