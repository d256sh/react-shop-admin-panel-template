import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import "./single.scss";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="single_container">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <button className="btn-edit">Edit</button>
              <img
                className="item_image"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.beckonmedia.com.au%2Fwp-content%2Fuploads%2F2018%2F07%2FProfessional-Portrait-Photography-17.jpg&f=1&nofb=1&ipt=fa9823f4b981ac4c304fb8b1e9ecf36e40cd4797c7d162a8be87caf8bfe49ab9&ipo=images"
                alt=""
              />
              <div className="details">
                <h3 className="details_title">Hanna Wats</h3>
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
                  <span className="item_key">Status</span>
                  <span className="item_value">Active</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart />
          </div>
        </div>
        <div className="bottom">
          <h3 className="title">Last Transactions</h3>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Single;
