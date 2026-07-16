import {
  AccountBalanceWalletOutlined,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  MonetizationOnOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./widget.scss";
import { selectDashboardWidgets } from "../../store/dashboardSlice";

const metaByType = {
  user: {
    title: "Users",
    link: "See all users",
    href: "/users",
    tone: "users",
    icon: <PersonOutline className="icon" />,
  },
  order: {
    title: "Orders",
    link: "See all orders",
    href: "/",
    tone: "orders",
    icon: <ShoppingCartOutlined className="icon" />,
  },
  earning: {
    title: "Earnings",
    link: "View net earnings",
    href: "/",
    tone: "earnings",
    icon: <MonetizationOnOutlined className="icon" />,
  },
  balance: {
    title: "Balance",
    link: "See details",
    href: "/",
    tone: "balance",
    icon: <AccountBalanceWalletOutlined className="icon" />,
  },
};

const Widget = ({ type }) => {
  const widgets = useSelector(selectDashboardWidgets);
  const stats = widgets[type];
  const meta = metaByType[type];

  if (!meta || !stats) return null;

  const isMoney = Boolean(stats.isMoney);
  const isPositive = Boolean(stats.isPositive);

  return (
    <div className={`widget box tone-${meta.tone}`}>
      <div className="left">
        <span className="title">{meta.title}</span>
        <span className="counter">
          {isMoney && "$"}
          {Number(stats.amount).toLocaleString()}
        </span>
        <Link to={meta.href} className="link">
          {meta.link}
        </Link>
      </div>
      <div className="right">
        <div className={`percentage ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? (
            <KeyboardArrowUpRounded className="arrow" />
          ) : (
            <KeyboardArrowDownRounded className="arrow" />
          )}
          <span>{stats.diff}%</span>
        </div>
        <div className="icon-wrap">{meta.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
