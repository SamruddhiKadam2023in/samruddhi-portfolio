import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorState } from './ErrorState';

interface State {
  hasError: boolean;
}

/** Last-resort boundary so an unexpected render error never leaves a blank page. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          code="error"
          title="Something went wrong."
          message="An unexpected error stopped this page from rendering. Reloading usually fixes it."
          showReload
        />
      );
    }
    return this.props.children;
  }
}
