import { KeyboardArrowUp, MoreVertOutlined } from "@mui/icons-material";
import "./featured.scss";

import CircularProgressWithLabel from "../CircularWithValueLabel";

const Featured = () => {
  const value = 10;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertOutlined fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featured-chart">
          <CircularProgressWithLabel value={value} />
        </div>
        <p className="title">Total sales today</p>
        <p className="amount">$420</p>
        <p className="desc">
          Previos transactions procesing. last payment may not be includeed.
        </p>
        <div className="summary">
          <div className="item">
            <div className="title">Target</div>
            <div className="result">
              <KeyboardArrowUp className="arrow" fontSize="small" />
              <span className="amount">$12.4k</span>
            </div>
          </div>
          <div className="item">
            <div className="title">last Week</div>
            <div className="result negative">
              <KeyboardArrowUp className="arrow" fontSize="small" />
              <span className="amount">$12.4k</span>
            </div>
          </div>
          <div className="item">
            <div className="title">Last Mouth</div>
            <div className="result positive">
              <KeyboardArrowUp className="arrow" fontSize="small" />
              <span className="amount">$12.4k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
