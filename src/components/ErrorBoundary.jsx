/**
 * Catches render errors so a single broken widget does not blank the whole app.
 * TODO: wire to an error reporting service in a production setup.
 */

import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Keep console signal for local debugging during interviews / demos.
    console.error("UI error boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-content" style={{ padding: 24 }}>
          <h1>Something went wrong</h1>
          <p>Reload the page or return to the dashboard.</p>
          <a href="/">Go to dashboard</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
