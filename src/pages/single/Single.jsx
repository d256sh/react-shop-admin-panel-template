import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import "./single.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useGetProductQuery,
  useGetUserQuery,
} from "../../services/fakeStoreApi";
import { getResourceFromPath } from "../../utils/resourceConfig";

const Single = () => {
  const { pathname } = useLocation();
  const { userId, productId } = useParams();
  const resource = getResourceFromPath(pathname);
  const id = resource === "products" ? productId : userId;

  const userQuery = useGetUserQuery(id, { skip: resource !== "users" || !id });
  const productQuery = useGetProductQuery(id, {
    skip: resource !== "products" || !id,
  });

  const query = resource === "products" ? productQuery : userQuery;
  const { data, isLoading, isError, error } = query;

  return (
    <div className="single page-shell">
      <Sidebar />
      <div className="single_container page-main">
        <Navbar />
        <div className="page-content">
          <div className="page-intro">
            <h1>{resource === "products" ? "Product details" : "User details"}</h1>
            <p>Data loaded with RTK Query from Fake Store API.</p>
          </div>

          {isLoading && (
            <div className="state-box">
              <CircularProgress size={28} sx={{ color: "var(--accent)" }} />
              <span>Loading…</span>
            </div>
          )}

          {isError && (
            <div className="state-box error">
              Failed to load: {error?.status ?? "network error"}
            </div>
          )}

          {data && (
            <>
              <div className="top">
                <div className="left box">
                  <div className="section-head">
                    <h2 className="title">Information</h2>
                    <Link to="/" className="btn-edit">
                      Edit
                    </Link>
                  </div>
                  <div className="item">
                    <img
                      className="item_image"
                      src={
                        resource === "products"
                          ? data.image
                          : `https://i.pravatar.cc/160?u=${data.email}`
                      }
                      alt={resource === "products" ? data.title : data.name}
                    />
                    <div className="details">
                      <h3 className="details_title">
                        {resource === "products" ? data.title : data.name}
                      </h3>
                      <span className={`status-badge ${data.status}`}>{data.status}</span>

                      {resource === "products" ? (
                        <>
                          <div className="detail">
                            <span className="item_key">Price</span>
                            <span className="item_value">${Number(data.price).toFixed(2)}</span>
                          </div>
                          <div className="detail">
                            <span className="item_key">Category</span>
                            <span className="item_value">{data.category}</span>
                          </div>
                          <div className="detail">
                            <span className="item_key">Rating</span>
                            <span className="item_value">
                              {Number(data.rating).toFixed(1)} / 5
                            </span>
                          </div>
                          <div className="detail">
                            <span className="item_key">Reviews</span>
                            <span className="item_value">{data.reviews}</span>
                          </div>
                          <div className="detail wide">
                            <span className="item_key">About</span>
                            <span className="item_value">{data.description}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="detail">
                            <span className="item_key">Email</span>
                            <span className="item_value">{data.email}</span>
                          </div>
                          <div className="detail">
                            <span className="item_key">Phone</span>
                            <span className="item_value">{data.phone}</span>
                          </div>
                          <div className="detail">
                            <span className="item_key">Username</span>
                            <span className="item_value">@{data.username}</span>
                          </div>
                          <div className="detail">
                            <span className="item_key">Street</span>
                            <span className="item_value">{data.street || "—"}</span>
                          </div>
                          <div className="detail">
                            <span className="item_key">City</span>
                            <span className="item_value">
                              {data.city}
                              {data.zipcode ? `, ${data.zipcode}` : ""}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="right">
                  <Chart
                    title={
                      resource === "products"
                        ? "Product Performance (Last 6 Months)"
                        : "User Spending (Last 6 Months)"
                    }
                  />
                </div>
              </div>
              <div className="bottom">
                <div className="section-head">
                  <h3 className="title">Last Transactions</h3>
                </div>
                <Table />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
