import { useEffect, useState } from "react";
import { LayoutDashboard, Plus, Trash2 } from "lucide-react";
import { createDashboard, listDashboards, deleteDashboard } from "../../api/dashboardApi";

export default function DashboardHome({ onOpenDashboard }) {
  const [dashboards, setDashboards] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDashboards = async () => {
    setLoading(true);
    const res = await listDashboards();
    setDashboards(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboards();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await createDashboard(name.trim());
    setName("");
    onOpenDashboard(res.data.data.id);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Delete this dashboard? This cannot be undone.")) return;
    await deleteDashboard(id);
    loadDashboards();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
      <div className="flex items-center gap-2 mb-8 text-gray-800">
        <LayoutDashboard size={28} className="text-brand-600" />
        <h1 className="text-2xl font-bold">Dashboard Builder</h1>
      </div>

      <form onSubmit={handleCreate} className="flex gap-2 w-full max-w-md mb-10">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New dashboard name..."
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <button
          type="submit"
          className="flex items-center gap-1 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          <Plus size={16} /> Create
        </button>
      </form>

      <div className="w-full max-w-md">
        <h2 className="text-xs font-semibold uppercase text-gray-400 mb-3">Your Dashboards</h2>

        {loading && <p className="text-sm text-gray-400">Loading...</p>}
        {!loading && dashboards.length === 0 && (
          <p className="text-sm text-gray-400">No dashboards yet — create one above.</p>
        )}

        <ul className="flex flex-col gap-2">
          {dashboards.map((d) => (
            <li
              key={d.id}
              onClick={() => onOpenDashboard(d.id)}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 cursor-pointer hover:border-brand-300"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{d.name}</p>
                <p className="text-xs text-gray-400">{d._count.widgets} widgets</p>
              </div>
              <button
                onClick={(e) => handleDelete(d.id, e)}
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
