import {describe, expect, it} from "vitest";
import {truncateString} from ".";

describe("turncateString function", () => {
  it("should return the original string if the length of the string is less than max", () => {
    const original = "jon";
    const max = 10;
    expect(truncateString(original, max)).toEqual(original);
  });

  it("should return the turncated string if the length of the striing is larger than max", () => {
    const original = "peterpan";
    const max = 5;
    expect(truncateString(original, max)).toEqual("peter...");
  });

  it("should return the original string if no max is provided", () => {
    const original = "peterpan";
    expect(truncateString(original)).toEqual(original);
  });
});
