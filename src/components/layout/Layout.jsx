/**
 * Admin shell: sticky sidebar + top navbar around page content.
 * Keeps page components focused on their own domain UI.
 */

import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const Layout = ({ children, className = "" }) => {
  return (
    <div className={`page-shell ${className}`.trim()}>
      <Sidebar />
      <div className="page-main">
        <Navbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
