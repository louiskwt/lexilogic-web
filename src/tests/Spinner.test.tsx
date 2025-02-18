import {cleanup, render, screen, waitFor} from "@testing-library/react";
import {afterEach, describe, expect, it} from "vitest";
import Spinner from "../components/Spinner";

describe("Spinner Test", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render a medium spinner by defualt when no size is provided and color is not set", async () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId("spinner");
    await waitFor(() => {
      expect(spinnerElement).toBeDefined();
      expect(spinnerElement.classList).toContain("w-8");
      expect(spinnerElement.classList).toContain("h-8");
      expect(spinnerElement.classList).toContain("border-zinc-300");
    });
    return;
  });

  it("should render a medium spinner by defualt when lg size is provided", async () => {
    render(<Spinner size="lg" />);
    const spinnerElement = screen.getByTestId("spinner");
    await waitFor(() => {
      expect(spinnerElement).toBeDefined();
      expect(spinnerElement.classList).toContain("w-12");
      expect(spinnerElement.classList).toContain("h-12");
    });
  });

  it("should render a medium spinner by defualt when sm size is provided", async () => {
    render(<Spinner size="sm" />);
    const spinnerElement = screen.getByTestId("spinner");
    await waitFor(() => {
      expect(spinnerElement).toBeDefined();
      expect(spinnerElement.classList).toContain("w-6");
      expect(spinnerElement.classList).toContain("h-6");
    });
  });

  it("should render a medium spinner by defualt when sm size is provided and color is set to secondary", async () => {
    render(<Spinner size="sm" color="secondary" />);
    const spinnerElement = screen.getByTestId("spinner");
    await waitFor(() => {
      expect(spinnerElement).toBeDefined();
      expect(spinnerElement.classList).toContain("w-6");
      expect(spinnerElement.classList).toContain("h-6");
      expect(spinnerElement.classList).toContain("border-gray-500");
    });
  });

  it("should render a medium spinner by defualt when sm size is provided and color is set to white", async () => {
    render(<Spinner size="sm" color="white" />);
    const spinnerElement = screen.getByTestId("spinner");
    await waitFor(() => {
      expect(spinnerElement).toBeDefined();
      expect(spinnerElement.classList).toContain("w-6");
      expect(spinnerElement.classList).toContain("h-6");
      expect(spinnerElement.classList).toContain("border-white");
    });
  });
});
