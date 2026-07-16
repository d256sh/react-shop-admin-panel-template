import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTable from "../../components/datatable/Datatable";

const List = () => {
  return (
    <div className="list page-shell">
      <Sidebar />
      <div className="list_container page-main">
        <Navbar />
        <div className="page-content">
          <div className="page-intro">
            <h1>Users</h1>
            <p>Manage accounts, roles and activity status.</p>
          </div>
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default List;
