import {
  ChatBubbleOutline,
  DarkModeOutlined,
  LanguageOutlined,
  LightModeOutlined,
  NotificationsNoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import "./navbar.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlined className="icon" />
        </div>
        <div className="items">
          <button
            type="button"
            className="item btn-toggle"
            onClick={() => dispatch({ type: "TOGGLE" })}
          >
            {darkMode ? (
              <LightModeOutlined style={{ color: "white" }} className="icon" />
            ) : (
              <DarkModeOutlined className="icon" />
            )}
          </button>
          <div className="item lang">
            <LanguageOutlined className="icon lang_icon" />
            <span className="lang_title">EN</span>
          </div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">13</div>
          </div>
          <div className="item">
            <ChatBubbleOutline className="icon" />
            <div className="counter">13</div>
          </div>
          <div className="item">
            <div className="avatar">
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
