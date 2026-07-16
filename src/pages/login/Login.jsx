import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { stat } from "../../static";
import "./login.scss";

/**
 * Login is a UI mock only — no auth API yet.
 * TODO: connect to real auth + protect admin routes.
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Login — DS Control";
  }, []);

  return (
    <div className="login">
      <div className="login-panel">
        <div className="brand">
          <span className="logo-mark">DA</span>
          <span className="logo">{stat.site_name}</span>
        </div>
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to manage your dashboard.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <button type="submit">Sign in</button>
        </form>
        <p className="footer">
          Back to <Link to="/">dashboard</Link>
        </p>
      </div>
      <div className="login-visual" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="copy">
          <p className="eyebrow">Control center</p>
          <h2>Modern admin for everyday operations</h2>
          <p>Track users, orders and revenue in one place.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
