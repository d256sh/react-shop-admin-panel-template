import { DriveFolderUploadOutlined } from "@mui/icons-material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import { useState } from "react";

const New = () => {
  const [file, setFile] = useState(
    "https://i.pravatar.cc/200?img=5"
  );

  return (
    <div className="new page-shell">
      <Sidebar />
      <div className="new_container page-main">
        <Navbar />
        <div className="page-content">
          <div className="page-intro">
            <h1>Add New User</h1>
            <p>Create a profile and upload an avatar.</p>
          </div>
          <div className="bottom box">
            <div className="left">
              <div className="avatar-preview">
                <img src={file} alt="avatar" />
              </div>
              <p className="hint">Profile photo preview</p>
            </div>
            <div className="right">
              <form>
                <div className="form-input upload">
                  <label className="image-upload" htmlFor="img">
                    <DriveFolderUploadOutlined className="icon" />
                    <span>Upload image</span>
                  </label>
                  <input
                    onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
                    name="img"
                    id="img"
                    type="file"
                    accept="image/*"
                  />
                </div>
                <div className="form-grid">
                  <div className="form-input">
                    <label htmlFor="name">Username</label>
                    <input id="name" type="text" placeholder="hanna_watts" />
                  </div>
                  <div className="form-input">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="da@gmail.com" />
                  </div>
                  <div className="form-input">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="text" placeholder="+380 ..." />
                  </div>
                  <div className="form-input">
                    <label htmlFor="age">Age</label>
                    <input id="age" type="number" placeholder="22" />
                  </div>
                </div>
                <button type="button" className="btn-create">
                  Create user
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
