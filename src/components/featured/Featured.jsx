import { KeyboardArrowDown, KeyboardArrowUp, MoreVertOutlined } from "@mui/icons-material";
import "./featured.scss";
import CircularProgressWithLabel from "../CircularWithValueLabel";
import { useAppSelector } from "../../hooks/redux";
import { selectDashboardFeatured } from "../../store/dashboardSlice";

const money = (value) =>
  `$${Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })}`;

const Featured = () => {
  const featured = useAppSelector(selectDashboardFeatured);

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
          <CircularProgressWithLabel value={featured.progress} />
        </div>
        <p className="subtitle">Avg. approved order</p>
        <p className="amount">{money(featured.todaySales)}</p>
        <p className="desc">
          Built from Fake Store carts in the dashboard slice.
        </p>
        <div className="summary">
          <div className="item">
            <div className="label">Target</div>
            <div className={`result ${featured.targetPositive ? "positive" : "negative"}`}>
              {featured.targetPositive ? (
                <KeyboardArrowUp className="arrow" fontSize="small" />
              ) : (
                <KeyboardArrowDown className="arrow" fontSize="small" />
              )}
              <span className="value">{money(featured.target)}</span>
            </div>
          </div>
          <div className="item">
            <div className="label">Last Week</div>
            <div
              className={`result ${featured.lastWeekPositive ? "positive" : "negative"}`}
            >
              {featured.lastWeekPositive ? (
                <KeyboardArrowUp className="arrow" fontSize="small" />
              ) : (
                <KeyboardArrowDown className="arrow" fontSize="small" />
              )}
              <span className="value">{money(featured.lastWeek)}</span>
            </div>
          </div>
          <div className="item">
            <div className="label">Last Month</div>
            <div
              className={`result ${featured.lastMonthPositive ? "positive" : "negative"}`}
            >
              {featured.lastMonthPositive ? (
                <KeyboardArrowUp className="arrow" fontSize="small" />
              ) : (
                <KeyboardArrowDown className="arrow" fontSize="small" />
              )}
              <span className="value">{money(featured.lastMonth)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
