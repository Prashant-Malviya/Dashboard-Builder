import { useState } from "react";
import { Toaster } from "react-hot-toast";
import DashboardHome from "./components/Layout/DashboardHome";
import Builder from "./components/Layout/Builder";

export default function App() {
  const [dashboardId, setDashboardId] = useState(null);

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      {!dashboardId ? (
        <DashboardHome onOpenDashboard={setDashboardId} />
      ) : (
        <Builder dashboardId={dashboardId} onBack={() => setDashboardId(null)} />
      )}
    </>
  );
}
