import "./sidebar.scss";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WindowIcon from "@mui/icons-material/Window";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { stat } from "../../static";

/**
 * Sidebar nav config.
 * TODO: Profile / Logout need real auth; Logout currently opens the login mock.
 */

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
      { name: "Posts", link: "/posts", icon: <ArticleIcon className="icon" /> },
    ],
  },
  {
    title: "Account",
    list: [
      { name: "Profile", link: "/users/1", icon: <AccountCircleIcon className="icon" /> },
      { name: "Logout", link: "/login", icon: <LogoutIcon className="icon" /> },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <header>
        <span className="logo-mark" aria-hidden="true">
          DS
        </span>
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
          <p className="footer-title">Demo panel</p>
          <p className="footer-text">See README for architecture notes</p>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
