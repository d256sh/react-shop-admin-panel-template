import {
  AccountBalanceWalletOutlined,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  MonetizationOnOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./widget.scss";

const Widget = ({ type }) => {
  let data;

  const amount = 100;
  const diff = 20;
  const isPositive = true;

  switch (type) {
    case "user":
      data = {
        title: "Users",
        is_money: false,
        link: "See all users",
        href: "/users",
        tone: "users",
        icon: <PersonOutline className="icon" />,
      };
      break;
    case "order":
      data = {
        title: "Orders",
        is_money: false,
        link: "See all orders",
        href: "/orders",
        tone: "orders",
        icon: <ShoppingCartOutlined className="icon" />,
      };
      break;
    case "earning":
      data = {
        title: "Earnings",
        is_money: true,
        link: "View net earnings",
        href: "/earnings",
        tone: "earnings",
        icon: <MonetizationOnOutlined className="icon" />,
      };
      break;
    case "balance":
      data = {
        title: "Balance",
        is_money: true,
        link: "See details",
        href: "/",
        tone: "balance",
        icon: <AccountBalanceWalletOutlined className="icon" />,
      };
      break;
    default:
      break;
  }

  return (
    <div className={`widget box tone-${data.tone}`}>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.is_money && "$"}
          {amount.toLocaleString()}
        </span>
        <Link to={data.href} className="link">
          {data.link}
        </Link>
      </div>
      <div className="right">
        <div className={`percentage ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? (
            <KeyboardArrowUpRounded className="arrow" />
          ) : (
            <KeyboardArrowDownRounded className="arrow" />
          )}
          <span>{diff}%</span>
        </div>
        <div className="icon-wrap">{data.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
