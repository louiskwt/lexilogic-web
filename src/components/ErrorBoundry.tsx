import {Component, ErrorInfo, ReactNode} from "react";
import ErrorPage from "./ErrorPage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error using a reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Navigate to the error page
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
