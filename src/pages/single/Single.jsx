import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import "./single.scss";

const Single = () => {
  return (
    <div className="single page-shell">
      <Sidebar />
      <div className="single_container page-main">
        <Navbar />
        <div className="page-content">
          <div className="page-intro">
            <h1>User details</h1>
            <p>Profile information and recent activity.</p>
          </div>
          <div className="top">
            <div className="left box">
              <div className="section-head">
                <h2 className="title">Information</h2>
                <button className="btn-edit" type="button">
                  Edit
                </button>
              </div>
              <div className="item">
                <img
                  className="item_image"
                  src="https://i.pravatar.cc/160?img=32"
                  alt="Hanna Watts"
                />
                <div className="details">
                  <h3 className="details_title">Hanna Watts</h3>
                  <span className="status-badge active">Active</span>
                  <div className="detail">
                    <span className="item_key">Email</span>
                    <span className="item_value">da@gmail.com</span>
                  </div>
                  <div className="detail">
                    <span className="item_key">Phone</span>
                    <span className="item_value">+380 73 199 89 26</span>
                  </div>
                  <div className="detail">
                    <span className="item_key">Age</span>
                    <span className="item_value">22</span>
                  </div>
                  <div className="detail">
                    <span className="item_key">Country</span>
                    <span className="item_value">Ukraine</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <Chart title="User Spending (Last 6 Months)" />
            </div>
          </div>
          <div className="bottom">
            <div className="section-head">
              <h3 className="title">Last Transactions</h3>
            </div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
