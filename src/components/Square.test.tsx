import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import Square from "./Square";

describe("Square", () => {
  it("should render the correct character", () => {
    render(<Square char="A" correct={false} misplaced={false} />);
    const square = screen.getByTestId("square-text");
    expect(square).toBeDefined();
    expect(square.textContent).toEqual("A");
  });
});
