import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useResource } from "../../hooks/useResource";
import { addUser, selectUsersActionStatus } from "../../store/usersSlice";
import { addProduct, selectProductsActionStatus } from "../../store/productsSlice";
import { addPost, selectPostsActionStatus } from "../../store/postsSlice";
import "./new.scss";

const DEFAULT_PRODUCT_IMAGE =
  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png";
const DEFAULT_AVATAR = "https://i.pravatar.cc/200?img=5";

const New = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { resource, config } = useResource();
  const isProduct = resource === "products";
  const isPost = resource === "posts";

  const usersActionStatus = useAppSelector(selectUsersActionStatus);
  const productsActionStatus = useAppSelector(selectProductsActionStatus);
  const postsActionStatus = useAppSelector(selectPostsActionStatus);
  const actionStatus = isProduct
    ? productsActionStatus
    : isPost
      ? postsActionStatus
      : usersActionStatus;

  const [previewUrl, setPreviewUrl] = useState(
    isProduct ? DEFAULT_PRODUCT_IMAGE : DEFAULT_AVATAR
  );
  const [objectUrl, setObjectUrl] = useState(null);
  const [form, setForm] = useState(() => {
    if (isProduct) return { title: "", price: "", category: "", description: "" };
    if (isPost) return { title: "", body: "", userId: "1" };
    return { username: "", email: "", phone: "", firstname: "", lastname: "" };
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = `Add ${config.title.slice(0, -1)} — DA Control`;
  }, [config.title]);

  // Revoke blob URLs to avoid memory leaks after local image preview.
  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const onChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const onFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (objectUrl) URL.revokeObjectURL(objectUrl);
    const nextUrl = URL.createObjectURL(file);
    setObjectUrl(nextUrl);
    setPreviewUrl(nextUrl);
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
            image: previewUrl,
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
    } catch (err) {
      setMessage(`Create failed: ${err?.message ?? "network error"}`);
    }
  };
  const isSaving = actionStatus === "loading";
  const entityLabel = isProduct ? "product" : isPost ? "post" : "user";

  useEffect(() => {
    if (!message.startsWith("Saved")) return undefined;
    const timerId = window.setTimeout(() => navigate(config.path), 700);
    return () => window.clearTimeout(timerId);
  }, [message, navigate, config.path]);

  return (
    <Layout className="new">
      <div className="page-intro">
        <h1>Add New {isProduct ? "Product" : isPost ? "Post" : "User"}</h1>
        <p>Creates an entity through a Redux Toolkit async thunk.</p>
      </div>
      <div className={`bottom box${isPost ? " post-form" : ""}`}>
        {!isPost && (
          <div className="left">
            <div className="avatar-preview">
              <img src={previewUrl} alt="preview" />
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
                  onChange={onFileChange}
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
            {message && (
              <p className="form-message" role="status">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default New;
