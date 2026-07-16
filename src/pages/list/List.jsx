import { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import DataTable from "../../components/datatable/Datatable";
import { useResource } from "../../hooks/useResource";
import "./list.scss";

const List = () => {
  const { resource, config } = useResource();

  useEffect(() => {
    document.title = `${config.title} — DA Control`;
  }, [config.title]);

  return (
    <Layout className="list">
      <div className="page-intro">
        <h1>{config.title}</h1>
        <p>{config.description}</p>
      </div>
      <DataTable resource={resource} />
    </Layout>
  );
};

export default List;
