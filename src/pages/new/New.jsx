import { DriveFolderUploadOutlined } from "@mui/icons-material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser, selectUsersActionStatus } from "../../store/usersSlice";
import { addProduct, selectProductsActionStatus } from "../../store/productsSlice";
import { addPost, selectPostsActionStatus } from "../../store/postsSlice";
import {
  getResourceFromPath,
  resourceConfig,
} from "../../utils/resourceConfig";

const New = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const resource = getResourceFromPath(pathname);
  const config = resourceConfig[resource];
  const isProduct = resource === "products";
  const isPost = resource === "posts";

  const usersActionStatus = useSelector(selectUsersActionStatus);
  const productsActionStatus = useSelector(selectProductsActionStatus);
  const postsActionStatus = useSelector(selectPostsActionStatus);
  const actionStatus = isProduct
    ? productsActionStatus
    : isPost
      ? postsActionStatus
      : usersActionStatus;

  const [file, setFile] = useState(
    isProduct
      ? "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
      : "https://i.pravatar.cc/200?img=5"
  );
  const [form, setForm] = useState(() => {
    if (isProduct) return { title: "", price: "", category: "", description: "" };
    if (isPost) return { title: "", body: "", userId: "1" };
    return { username: "", email: "", phone: "", firstname: "", lastname: "" };
  });
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      if (isProduct) {
        await dispatch(
          addProduct({
            title: form.title,
            price: Number(form.price),
            description: form.description || "New product",
            image: file,
            category: form.category || "general",
          })
        ).unwrap();
      } else if (isPost) {
        await dispatch(
          addPost({
            title: form.title,
            body: form.body,
            userId: Number(form.userId) || 1,
          })
        ).unwrap();
      } else {
        await dispatch(
          addUser({
            email: form.email,
            username: form.username,
            password: "pass123",
            name: {
              firstname: form.firstname || form.username,
              lastname: form.lastname || "User",
            },
            address: {
              city: "kyiv",
              street: "main",
              number: 1,
              zipcode: "01001",
              geolocation: { lat: "0", long: "0" },
            },
            phone: form.phone,
          })
        ).unwrap();
      }

      setMessage("Saved to store. Redirecting…");
      setTimeout(() => navigate(config.path), 700);
    } catch (err) {
      setMessage(`Create failed: ${err?.message ?? "network error"}`);
    }
  };

  const isSaving = actionStatus === "loading";
  const entityLabel = isProduct ? "product" : isPost ? "post" : "user";

  return (
    <div className="new page-shell">
      <Sidebar />
      <div className="new_container page-main">
        <Navbar />
        <div className="page-content">
          <div className="page-intro">
            <h1>Add New {isProduct ? "Product" : isPost ? "Post" : "User"}</h1>
            <p>Dispatch createAsyncThunk → slice updates store.</p>
          </div>
          <div className={`bottom box${isPost ? " post-form" : ""}`}>
            {!isPost && (
              <div className="left">
                <div className="avatar-preview">
                  <img src={file} alt="preview" />
                </div>
                <p className="hint">{isProduct ? "Product image" : "Profile photo"}</p>
              </div>
            )}
            <div className="right">
              <form onSubmit={onSubmit}>
                {!isPost && (
                  <div className="form-input upload">
                    <label className="image-upload" htmlFor="img">
                      <DriveFolderUploadOutlined className="icon" />
                      <span>Upload image</span>
                    </label>
                    <input
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFile(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      name="img"
                      id="img"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                )}

                {isProduct && (
                  <div className="form-grid">
                    <div className="form-input">
                      <label htmlFor="title">Title</label>
                      <input
                        id="title"
                        type="text"
                        placeholder="Fjallraven backpack"
                        value={form.title}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="price">Price</label>
                      <input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="109.95"
                        value={form.price}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="category">Category</label>
                      <input
                        id="category"
                        type="text"
                        placeholder="men's clothing"
                        value={form.category}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="description">Description</label>
                      <input
                        id="description"
                        type="text"
                        placeholder="Short description"
                        value={form.description}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                )}

                {isPost && (
                  <div className="form-grid post-grid">
                    <div className="form-input full">
                      <label htmlFor="title">Title</label>
                      <input
                        id="title"
                        type="text"
                        placeholder="Post title"
                        value={form.title}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="userId">Author user ID</label>
                      <input
                        id="userId"
                        type="number"
                        min="1"
                        placeholder="1"
                        value={form.userId}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-input full">
                      <label htmlFor="body">Body</label>
                      <textarea
                        id="body"
                        rows={8}
                        placeholder="Write your post content…"
                        value={form.body}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                )}

                {!isProduct && !isPost && (
                  <div className="form-grid">
                    <div className="form-input">
                      <label htmlFor="username">Username</label>
                      <input
                        id="username"
                        type="text"
                        placeholder="johnd"
                        value={form.username}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@gmail.com"
                        value={form.email}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="firstname">First name</label>
                      <input
                        id="firstname"
                        type="text"
                        placeholder="John"
                        value={form.firstname}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="lastname">Last name</label>
                      <input
                        id="lastname"
                        type="text"
                        placeholder="Doe"
                        value={form.lastname}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        type="text"
                        placeholder="1-570-236-7033"
                        value={form.phone}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="btn-create" disabled={isSaving}>
                  {isSaving ? "Creating…" : `Create ${entityLabel}`}
                </button>
                {message && <p className="form-message">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
