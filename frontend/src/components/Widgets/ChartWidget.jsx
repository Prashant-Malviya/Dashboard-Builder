import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import "../../utils/chartSetup"; // ensures Chart.js elements are registered
import { toChartJsData } from "../../utils/chartData";

const CHART_COMPONENTS = { bar: Bar, line: Line, pie: Pie, doughnut: Doughnut };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } },
  },
};

export default function ChartWidget({ content }) {
  const ChartComponent = CHART_COMPONENTS[content.chartType] || Bar;

  return (
    <div className="w-full h-full flex flex-col bg-white p-3">
      <p className="text-sm font-semibold text-gray-700 mb-2 truncate">{content.title}</p>
      <div className="flex-1 min-h-0">
        <ChartComponent data={toChartJsData(content)} options={options} />
      </div>
    </div>
  );
}
