import { useCallback, useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";
import { saveLayout } from "../api/layoutApi";


export default function useDashboard(dashboardId) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchDashboard = useCallback(async () => {
    if (!dashboardId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getDashboard(dashboardId);
      setDashboard(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [dashboardId]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const persistLayout = useCallback(
    async (widgets) => {
      if (!dashboardId) return;
      setSaving(true);
      try {
        const res = await saveLayout(dashboardId, widgets);
        return res.data.data; // saved widgets, with real DB ids
      } finally {
        setSaving(false);
      }
    },
    [dashboardId]
  );

  return { dashboard, loading, error, saving, refetch: fetchDashboard, persistLayout };
}
