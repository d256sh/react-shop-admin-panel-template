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
    <header className="navbar">
      <div className="wrapper">
        <div className="search">
          <SearchOutlined className="icon" />
          <input type="text" placeholder="Search users, orders..." />
          <kbd>⌘K</kbd>
        </div>
        <div className="items">
          <button
            type="button"
            className="item btn-toggle"
            aria-label="Toggle theme"
            onClick={() => dispatch({ type: "TOGGLE" })}
          >
            {darkMode ? (
              <LightModeOutlined className="icon" />
            ) : (
              <DarkModeOutlined className="icon" />
            )}
          </button>
          <button type="button" className="item lang" aria-label="Language">
            <LanguageOutlined className="icon" />
            <span className="lang_title">EN</span>
          </button>
          <button type="button" className="item" aria-label="Notifications">
            <NotificationsNoneOutlined className="icon" />
            <span className="counter">3</span>
          </button>
          <button type="button" className="item" aria-label="Messages">
            <ChatBubbleOutline className="icon" />
            <span className="counter">2</span>
          </button>
          <div className="item profile">
            <div className="avatar">
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Admin"
              />
            </div>
            <div className="profile-meta">
              <span className="name">Admin</span>
              <span className="role">Manager</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
