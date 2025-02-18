import {cleanup, render, screen} from "@testing-library/react";
import React from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import ErrorBoundary from "../components/ErrorBoundry";

describe("ErrorBoundary", () => {
  const TestComponent: React.FC = () => {
    throw new Error("Test error");
  };

  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("should render the ErrorPage component when there is an error", () => {
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeDefined();
  });

  it("should render the children when there is no error", () => {
    const ChildComponent: React.FC = () => <div>Child component</div>;

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/child component/i)).toBeDefined();
    expect(screen.queryByText(/something went wrong/i)).toBeNull();
  });

  it("should log the error using console.error", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error), expect.any(Object));
  });
});
