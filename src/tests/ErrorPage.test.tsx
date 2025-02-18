import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import ErrorPage from "../components/ErrorPage";

describe("Error Page", () => {
  it("should render ErrorPage properly", () => {
    render(<ErrorPage />);

    expect(screen.getAllByText("⚠️Error⚠️")).toBeDefined();
    expect(screen.getAllByText("🚧 Something went wrong. Please try again later. 🚧")).toBeDefined();
    expect(screen.getAllByText("🚧 哎呀,看起來出了點小問題。請等下再試一次吧 🚧")).toBeDefined();
  });
});
