import {
  AccountBalanceWalletOutlined,
  KeyboardArrowUpRounded,
  MonetizationOnOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import "./widget.scss";

const Widget = ({ type }) => {
  let data;

  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        is_money: false,
        link: `See all users`,
        href: "/users",
        icon: (
          <PersonOutline
            className="icon"
            style={{ backgroundColor: "#ffc5a8", color: "#ff5e00" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        is_money: false,
        link: `See all orders`,
        href: "/orders",
        icon: (
          <ShoppingCartOutlined
            className="icon"
            style={{ backgroundColor: "#ffdfa8", color: "#ffb300" }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        is_money: true,
        link: `View net earnings`,
        href: "/earnings",
        icon: (
          <MonetizationOnOutlined
            className="icon"
            style={{ backgroundColor: "#bbffaa", color: "#31f700" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        is_money: true,
        link: `See details`,
        href: "/",
        icon: (
          <AccountBalanceWalletOutlined
            className="icon"
            style={{ backgroundColor: "#d4a8ff", color: "#8000ff" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget box">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.is_money && "$"} {amount}
        </span>
        <a href={data.href} className="link">
          {data.link}
        </a>
      </div>
      <div className="right">
        <div className="percentage positive negative">
          <KeyboardArrowUpRounded className="arrow" />
          <span>{diff} %</span>
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
