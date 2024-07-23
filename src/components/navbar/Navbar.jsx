import {
  ChatBubbleOutline,
  DarkModeOutlined,
  LanguageOutlined,
  NotificationsNoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlined className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlined className="icon" />
          </div>
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
