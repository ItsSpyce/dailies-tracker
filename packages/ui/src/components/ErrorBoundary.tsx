import React, { Component } from 'react';

export type ErrorBoundaryProps = React.PropsWithChildren & {
  fallback: React.ReactNode;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
