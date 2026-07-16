import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { selectDashboardChart } from "../../store/dashboardSlice";

const color = {
  users: "#38bdf8",
  orders: "#fbbf24",
  earnings: "#34d399",
  balance: "#2dd4bf",
  total: "#0f766e",
};

const Chart = ({ title = "Last 6 Months (Revenue)" }) => {
  const chartData = useSelector(selectDashboardChart);

  return (
    <div className="chart box">
      <div className="chart-header">
        <span className="title">{title}</span>
        <span className="hint">From dashboard store</span>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.users} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color.users} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.orders} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color.orders} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.earnings} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color.earnings} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.balance} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color.balance} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.total} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color.total} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              boxShadow: "var(--shadow)",
              color: "var(--text)",
            }}
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke={color.users}
            fillOpacity={1}
            fill="url(#colorUsers)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke={color.orders}
            fillOpacity={1}
            fill="url(#colorOrders)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="earnings"
            stroke={color.earnings}
            fillOpacity={1}
            fill="url(#colorEarnings)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke={color.balance}
            fillOpacity={1}
            fill="url(#colorBalance)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke={color.total}
            fillOpacity={1}
            fill="url(#colorTotal)"
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
