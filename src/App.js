import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Home from "./pages/home/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import { DarkModeContext } from "./context/darkModeContext";
import "./App.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />

              {/* Static `new` routes must stay above `:id` for clear intent. */}
              <Route path="users">
                <Route index element={<List />} />
                <Route path="new" element={<New />} />
                <Route path=":userId" element={<Single />} />
              </Route>
              <Route path="products">
                <Route index element={<List />} />
                <Route path="new" element={<New />} />
                <Route path=":productId" element={<Single />} />
              </Route>
              <Route path="posts">
                <Route index element={<List />} />
                <Route path="new" element={<New />} />
                <Route path=":postId" element={<Single />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
