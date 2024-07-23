import "./sidebar.scss";
import React from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WindowIcon from "@mui/icons-material/Window";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LogoutIcon from "@mui/icons-material/Logout";

import { stat } from "../../static";

import { NavLink } from "react-router-dom";

const sidebar = [
  {
    title: "Main",
    list: [
      { name: "Dashbourd", link: "/", icon: <SpaceDashboardIcon className="icon" /> },
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
    title: "Service",
    list: [{ name: "Logs", link: "/logs", icon: <SubtitlesIcon className="icon" /> }],
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
    <div className="sidebar">
      <header>
        <span className="logo">{stat.site_name}</span>
      </header>
      <hr />
      <div className="center">
        <ul>
          {sidebar.map(({ title, list }) => (
            <li key={title}>
              <span className="title">{title}</span>
              <ul>
                {list.map(({ name, icon, link }) => (
                  <li key={name}>
                    {icon}
                    <NavLink to={link}>{name}</NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
