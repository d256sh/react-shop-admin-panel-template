import { DriveFolderUploadOutlined } from "@mui/icons-material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddProductMutation,
  useAddUserMutation,
} from "../../services/fakeStoreApi";
import {
  getResourceFromPath,
  resourceConfig,
} from "../../utils/resourceConfig";

const New = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const resource = getResourceFromPath(pathname);
  const config = resourceConfig[resource];
  const isProduct = resource === "products";

  const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation();

  const [file, setFile] = useState(
    isProduct
      ? "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
      : "https://i.pravatar.cc/200?img=5"
  );
  const [form, setForm] = useState(
    isProduct
      ? { title: "", price: "", category: "", description: "" }
      : { username: "", email: "", phone: "", firstname: "", lastname: "" }
  );
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
        await addProduct({
          title: form.title,
          price: Number(form.price),
          description: form.description || "New product",
          image: file,
          category: form.category || "general",
        }).unwrap();
      } else {
        await addUser({
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
        }).unwrap();
      }

      setMessage("Created (Fake Store API mock response). Redirecting…");
      setTimeout(() => navigate(config.path), 700);
    } catch (err) {
      setMessage(`Create failed: ${err?.status ?? "network error"}`);
    }
  };

  return (
    <div className="new page-shell">
      <Sidebar />
      <div className="new_container page-main">
        <Navbar />
        <div className="page-content">
          <div className="page-intro">
            <h1>Add New {isProduct ? "Product" : "User"}</h1>
            <p>Create via RTK Query mutation against Fake Store API.</p>
          </div>
          <div className="bottom box">
            <div className="left">
              <div className="avatar-preview">
                <img src={file} alt="preview" />
              </div>
              <p className="hint">{isProduct ? "Product image" : "Profile photo"}</p>
            </div>
            <div className="right">
              <form onSubmit={onSubmit}>
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

                {isProduct ? (
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
                ) : (
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

                <button
                  type="submit"
                  className="btn-create"
                  disabled={isAddingUser || isAddingProduct}
                >
                  {isAddingUser || isAddingProduct
                    ? "Creating…"
                    : `Create ${isProduct ? "product" : "user"}`}
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
