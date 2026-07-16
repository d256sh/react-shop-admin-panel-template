import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Layout from "../../components/layout/Layout";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import {
  fetchDashboard,
  selectDashboardStatus,
  selectDashboardUpdatedAt,
} from "../../store/dashboardSlice";
import "./home.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectDashboardStatus);
  const updatedAt = useAppSelector(selectDashboardUpdatedAt);

  useEffect(() => {
    document.title = "Dashboard — DS Control";
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboard());
    }
  }, [dispatch, status]);

  const metaLabel = updatedAt
    ? `Updated ${new Date(updatedAt).toLocaleTimeString()}`
    : status === "loading"
      ? "Loading…"
      : "Waiting for data";

  return (
    <Layout className="home">
      <div className="page-intro">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of users, carts and revenue from the store.</p>
        </div>
      </div>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <Chart />
      </div>
      <div className="list_container">
        <div className="section-head">
          <h3 className="title">Latest Transactions</h3>
          <span className="meta">{metaLabel}</span>
        </div>
        <Table />
      </div>
    </Layout>
  );
};

export default Home;
