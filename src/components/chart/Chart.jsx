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

import { data } from "./statData.js";

const color = {
  users: "#ffc5a8",
  orders: "#ffdfa8",
  earnings: "#ccfbc0",
  balance: "#c386ff",
  total: "#1976d2",
};

const Chart = () => {
  return (
    <div className="chart box">
      <span className="title">Last 6 Mouths (Revenue)</span>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor={color.users} stopOpacity={0.5} />
              <stop offset="65%" stopColor={color.users} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor={color.orders} stopOpacity={0.5} />
              <stop offset="65%" stopColor={color.orders} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEarinings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor={color.earnings} stopOpacity={0.5} />
              <stop offset="65%" stopColor={color.earnings} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor={color.balance} stopOpacity={0.5} />
              <stop offset="65%" stopColor={color.balance} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor={color.total} stopOpacity={0.5} />
              <stop offset="65%" stopColor={color.total} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stroke={color.users}
            fillOpacity={1}
            fill="url(#colorUsers)"
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke={color.orders}
            fillOpacity={1}
            fill="url(#colorOrders)"
          />
          <Area
            type="monotone"
            dataKey="earinings"
            stroke={color.earnings}
            fillOpacity={1}
            fill="url(#colorEarinings)"
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke={color.balance}
            fillOpacity={1}
            fill="url(#colorBalance)"
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke={color.total}
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
