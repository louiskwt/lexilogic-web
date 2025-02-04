import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import Square from "./Square";

describe("Square", () => {
  it("should render the correct character", () => {
    render(<Square char="A" correct={false} misplaced={false} testId="square-text" />);
    const square = screen.getByTestId("square-text");
    expect(square).toBeDefined();
    expect(square.textContent).toEqual("A");
  });

  it("should render the correct styles for a correct letter", () => {
    render(<Square char="A" correct={true} misplaced={false} testId="correct-square" />);
    const square = screen.getByTestId("correct-square");
    expect(square).toBeDefined();
    expect(square.textContent).toEqual("A");
    expect(square.parentElement?.classList).toContain("rotate-y");
    expect(square.parentElement?.firstElementChild?.classList).toContain("bg-green-500");
  });

  it("should render the correct styles for a misplaced letter", () => {
    render(<Square char="A" correct={false} misplaced={true} testId="misplaced-square" />);
    const square = screen.getByTestId("misplaced-square");
    expect(square).toBeDefined();
    expect(square.textContent).toEqual("A");
    expect(square.parentElement?.classList).toContain("rotate-y");
    expect(square.parentElement?.firstElementChild?.classList).toContain("bg-yellow-500");
  });

  it("should render the correct styles for an incorrect letter", () => {
    render(<Square char="A" correct={false} misplaced={false} testId="incorrect-square" />);
    const square = screen.getByTestId("incorrect-square");
    expect(square).toBeDefined();
    expect(square.textContent).toEqual("A");
    expect(square.parentElement?.firstElementChild?.classList).toContain("bg-gray-700");
  });
});
