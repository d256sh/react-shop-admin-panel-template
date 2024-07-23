import { DriveFolderUploadOutlined } from "@mui/icons-material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import { useState } from "react";

const New = () => {
  const [file, setFile] = useState(
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=df65efa38831722b156ee8540a1ec1421827bb7db622b8a4093d34e15bfa3dfb&ipo=images"
  );

  return (
    <div className="new">
      <Sidebar />
      <div className="new_container">
        <Navbar />
        <div className="top box">
          <h1>Add New User</h1>
        </div>
        <div className="bottom box">
          <div className="left">
            <img src={file} alt="avatar" />
          </div>
          <div className="right">
            <form>
              <div className="form-input">
                <label className="image-upload" htmlFor="img">
                  <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
                  name="img"
                  id="img"
                  type="file"
                />
              </div>
              <div className="form-input">
                <label htmlFor="name">Username</label>
                <input id="name" type="text" />
              </div>
              <div className="form-input">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" />
              </div>
              <div className="form-input">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="text" />
              </div>
              <div className="form-input">
                <label htmlFor="age">age</label>
                <input id="age" type="number" />
              </div>
              <button type="button">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
