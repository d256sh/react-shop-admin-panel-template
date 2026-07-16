import { KeyboardArrowDown, KeyboardArrowUp, MoreVertOutlined } from "@mui/icons-material";
import "./featured.scss";
import CircularProgressWithLabel from "../CircularWithValueLabel";

const Featured = () => {
  const value = 70;

  return (
    <div className="featured box">
      <div className="top">
        <h2 className="title">Total Revenue</h2>
        <button type="button" className="more" aria-label="More options">
          <MoreVertOutlined fontSize="small" />
        </button>
      </div>
      <div className="bottom">
        <div className="featured-chart">
          <CircularProgressWithLabel value={value} />
        </div>
        <p className="subtitle">Total sales today</p>
        <p className="amount">$420</p>
        <p className="desc">
          Previous transactions are processing. Last payment may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="label">Target</div>
            <div className="result positive">
              <KeyboardArrowUp className="arrow" fontSize="small" />
              <span className="value">$12.4k</span>
            </div>
          </div>
          <div className="item">
            <div className="label">Last Week</div>
            <div className="result negative">
              <KeyboardArrowDown className="arrow" fontSize="small" />
              <span className="value">$12.4k</span>
            </div>
          </div>
          <div className="item">
            <div className="label">Last Month</div>
            <div className="result positive">
              <KeyboardArrowUp className="arrow" fontSize="small" />
              <span className="value">$12.4k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
