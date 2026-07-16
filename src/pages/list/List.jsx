import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTable from "../../components/datatable/Datatable";
import { useLocation } from "react-router-dom";
import {
  getResourceFromPath,
  resourceConfig,
} from "../../utils/resourceConfig";

const List = () => {
  const { pathname } = useLocation();
  const resource = getResourceFromPath(pathname);
  const config = resourceConfig[resource];

  return (
    <div className="list page-shell">
      <Sidebar />
      <div className="list_container page-main">
        <Navbar />
        <div className="page-content">
          <div className="page-intro">
            <h1>{config.title}</h1>
            <p>{config.description}</p>
          </div>
          <DataTable resource={resource} />
        </div>
      </div>
    </div>
  );
};

export default List;
