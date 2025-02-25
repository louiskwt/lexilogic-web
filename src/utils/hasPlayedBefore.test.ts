import {cleanup} from "@testing-library/react";
import {afterEach, describe, expect, it} from "vitest";
import {hasPlayedBefore} from ".";

describe("hasPlayedBefore", () => {
  afterEach(() => {
    cleanup();
  });

  it("should return false if playedBefore is not set but calling hasPlayedBefore again will be true", () => {
    expect(hasPlayedBefore()).toBeFalsy();
    expect(hasPlayedBefore()).toBeTruthy();
  });

  it("should return true if playedBefore is set to 'true'", () => {
    localStorage.setItem("hasPlayedBefore", "true");
    expect(hasPlayedBefore()).toBeTruthy();
  });
});
