"use client";

import React, { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { error: string | null };

export class AdminErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error: error?.message || "Unknown error" };
  }

  componentDidCatch(error: Error) {
    console.error("Admin UI error:", error);
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-semibold">Admin form error</p>
            <p className="mt-1 font-mono text-xs">{this.state.error}</p>
            <button
              type="button"
              className="mt-3 rounded-lg bg-red-700 px-3 py-2 text-xs font-semibold text-white"
              onClick={() => this.setState({ error: null })}
            >
              Retry
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
