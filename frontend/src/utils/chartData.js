
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const PALETTE = [
  "#6c4bf4", "#22c55e", "#f97316", "#ef4444",
  "#0ea5e9", "#eab308", "#ec4899", "#14b8a6",
];

export const CHART_TYPE_LABELS = {
  bar: "Bar Chart",
  line: "Line Chart",
  pie: "Pie Chart",
  doughnut: "Doughnut Chart",
};

// Used only as a safe fallback (e.g. if a widget is ever created without going through the modal)
export const generateDummyChartData = (chartType = "bar") => ({
  chartType,
  title: "Sample Chart",
  labels: MONTHS,
  data: MONTHS.map(() => Math.floor(Math.random() * 90) + 10),
});


export const toChartJsData = (content) => {
  const isSliceChart = content.chartType === "pie" || content.chartType === "doughnut";
  const labels = content.labels || [];

  return {
    labels,
    datasets: [
      {
        label: content.title || "Data",
        data: content.data || [],
        backgroundColor: isSliceChart
          ? labels.map((_, i) => PALETTE[i % PALETTE.length])
          : "#6c4bf4",
        borderColor: content.chartType === "line" ? "#6c4bf4" : "#ffffff",
        borderWidth: content.chartType === "line" ? 2 : 1,
        borderRadius: content.chartType === "bar" ? 6 : 0,
        tension: content.chartType === "line" ? 0.35 : 0,
      },
    ],
  };
};
