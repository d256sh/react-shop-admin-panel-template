import "./sidebar.scss";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WindowIcon from "@mui/icons-material/Window";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { stat } from "../../static";

const sidebar = [
  {
    title: "Main",
    list: [
      { name: "Dashboard", link: "/", icon: <SpaceDashboardIcon className="icon" /> },
    ],
  },
  {
    title: "Lists",
    list: [
      { name: "Users", link: "/users", icon: <PeopleAltIcon className="icon" /> },
      { name: "Products", link: "/products", icon: <WindowIcon className="icon" /> },
    ],
  },
  {
    title: "User",
    list: [
      { name: "Profile", link: "/profile", icon: <AccountCircleIcon className="icon" /> },
      { name: "Logout", link: "/logout", icon: <LogoutIcon className="icon" /> },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <header>
        <span className="logo-mark">DA</span>
        <span className="logo">{stat.site_name}</span>
      </header>

      <nav className="center">
        <ul>
          {sidebar.map(({ title, list }) => (
            <li key={title} className="nav-group">
              <span className="title">{title}</span>
              <ul>
                {list.map(({ name, icon, link }) => (
                  <li key={name}>
                    <NavLink to={link} end={link === "/"} className="nav-link">
                      {icon}
                      <span>{name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="sidebar-footer">
        <div className="footer-card">
          <p className="footer-title">Need help?</p>
          <p className="footer-text">Check docs & shortcuts</p>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
