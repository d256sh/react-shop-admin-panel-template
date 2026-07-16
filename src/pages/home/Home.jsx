import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home page-shell">
      <Sidebar />
      <div className="home_container page-main">
        <Navbar />
        <div className="page-content">
          <div className="page-intro">
            <div>
              <h1>Dashboard</h1>
              <p>Overview of users, orders and revenue.</p>
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
              <span className="meta">Updated just now</span>
            </div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
