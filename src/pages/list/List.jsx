import "./list.scss";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTable from "../../components/datatable/Datatable";

const List = () => {
  return (
    <div className="list ">
      <Sidebar />
      <div className="list_container">
        <Navbar />
        <DataTable />
      </div>
    </div>
  );
};

export default List;
