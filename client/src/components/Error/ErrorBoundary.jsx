/* eslint-disable react/prop-types */
import { Component } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, goHomeClicked: false };
  }

  static getDerivedStateFromError(error) {
    console.log("derived state from error: " + error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleRetry = () => {
    // Reset state to retry rendering
    this.setState({ hasError: false, goHomeClicked: false });
  };

  handleGoHome = () => {
    // Navigate to the home page
    this.setState({ goHomeClicked: true });
    this.props.navigate("/");
  };

  render() {
    if (this.state.hasError) {
      const { goHomeClicked } = this.state;
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle={
            goHomeClicked
              ? "You can now press Retry to attempt reloading the page."
              : "Please press the 'Go Home' button first. Then, press 'Retry' to try again."
          }
          extra={[
            <Button type="default" onClick={this.handleGoHome} key="home">
              Go Home
            </Button>,
            <Button
              type="primary"
              onClick={this.handleRetry}
              key="retry"
              disabled={!goHomeClicked}
            >
              Retry
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

// Wrapper component to inject the `useNavigate` hook
function ErrorBoundaryWrapper(props) {
  const navigate = useNavigate();
  return <ErrorBoundary {...props} navigate={navigate} />;
}

export default ErrorBoundaryWrapper;
