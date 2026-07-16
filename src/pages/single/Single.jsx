import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import "./single.scss";
import { getResourceFromPath } from "../../utils/resourceConfig";
import {
  clearCurrentUser,
  fetchUserById,
  selectCurrentUser,
  selectCurrentUserStatus,
  selectUsersError,
} from "../../store/usersSlice";
import {
  clearCurrentProduct,
  fetchProductById,
  selectCurrentProduct,
  selectCurrentProductStatus,
  selectProductsError,
} from "../../store/productsSlice";
import {
  clearCurrentPost,
  fetchPostById,
  fetchPostComments,
  selectCurrentPost,
  selectCurrentPostStatus,
  selectPostComments,
  selectPostCommentsStatus,
  selectPostsError,
} from "../../store/postsSlice";

const Single = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { userId, productId, postId } = useParams();
  const resource = getResourceFromPath(pathname);
  const id =
    resource === "products" ? productId : resource === "posts" ? postId : userId;

  const user = useSelector(selectCurrentUser);
  const product = useSelector(selectCurrentProduct);
  const post = useSelector(selectCurrentPost);
  const comments = useSelector(selectPostComments);
  const userStatus = useSelector(selectCurrentUserStatus);
  const productStatus = useSelector(selectCurrentProductStatus);
  const postStatus = useSelector(selectCurrentPostStatus);
  const commentsStatus = useSelector(selectPostCommentsStatus);
  const usersError = useSelector(selectUsersError);
  const productsError = useSelector(selectProductsError);
  const postsError = useSelector(selectPostsError);

  const dataByResource = { users: user, products: product, posts: post };
  const statusByResource = {
    users: userStatus,
    products: productStatus,
    posts: postStatus,
  };
  const errorByResource = {
    users: usersError,
    products: productsError,
    posts: postsError,
  };

  const data = dataByResource[resource];
  const status = statusByResource[resource];
  const error = errorByResource[resource];
  const isLoading = status === "loading" || status === "idle";
  const isError = status === "failed";

  useEffect(() => {
    if (!id) return undefined;

    if (resource === "users") {
      dispatch(fetchUserById(id));
    }
    if (resource === "products") {
      dispatch(fetchProductById(id));
    }
    if (resource === "posts") {
      dispatch(fetchPostById(id));
      dispatch(fetchPostComments(id));
    }

    return () => {
      if (resource === "users") dispatch(clearCurrentUser());
      if (resource === "products") dispatch(clearCurrentProduct());
      if (resource === "posts") dispatch(clearCurrentPost());
    };
  }, [dispatch, id, resource]);

  const titles = {
    users: "User details",
    products: "Product details",
    posts: "Post details",
  };

  return (
    <div className="single page-shell">
      <Sidebar />
      <div className="single_container page-main">
        <Navbar />
        <div className="page-content">
          <div className="page-intro">
            <h1>{titles[resource]}</h1>
            <p>
              {resource === "posts"
                ? "Read the full post and browse comments."
                : "Data from Redux store slices."}
            </p>
          </div>

          {isLoading && (
            <div className="state-box">
              <CircularProgress size={28} sx={{ color: "var(--accent)" }} />
              <span>Loading…</span>
            </div>
          )}

          {isError && (
            <div className="state-box error">
              Failed to load: {error ?? "network error"}
            </div>
          )}

          {data && resource === "posts" && (
            <div className="post-view">
              <article className="post-card box">
                <div className="section-head">
                  <span className={`status-badge ${data.status}`}>{data.status}</span>
                  <Link to="/posts" className="btn-edit">
                    Back to posts
                  </Link>
                </div>
                <h2 className="post-title">{data.title}</h2>
                <div className="post-meta">
                  <Link to={data.authorLink} className="cell-link">
                    {data.author}
                  </Link>
                  <span>·</span>
                  <span>{data.words} words</span>
                  <span>·</span>
                  <span>Post #{data.id}</span>
                </div>
                <p className="post-body">{data.body}</p>
              </article>

              <section className="comments box">
                <div className="section-head">
                  <h3 className="title">Comments ({comments.length})</h3>
                </div>
                {commentsStatus === "loading" && (
                  <div className="state-box compact">
                    <CircularProgress size={22} sx={{ color: "var(--accent)" }} />
                    <span>Loading comments…</span>
                  </div>
                )}
                {commentsStatus !== "loading" && comments.length === 0 && (
                  <p className="empty-comments">No comments yet.</p>
                )}
                <ul className="comments-list">
                  {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                      <div className="comment-head">
                        <strong>{comment.name}</strong>
                        <a className="cell-link" href={`mailto:${comment.email}`}>
                          {comment.email}
                        </a>
                      </div>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {data && resource !== "posts" && (
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
                          : data.avatar || `https://i.pravatar.cc/160?u=${data.email}`
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
                            <span className="item_value">
                              ${Number(data.price).toFixed(2)}
                            </span>
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
