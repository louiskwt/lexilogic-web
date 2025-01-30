import {describe, expect, it} from "vitest";
import {isDateOneWeekBefore} from ".";

describe("isDateOneWeekBefore", () => {
  it("should return true if the current date is exactly one week before the reference date", () => {
    const currentDate = new Date("2023-01-23");
    const referenceDate = new Date("2023-01-30");
    expect(isDateOneWeekBefore(currentDate, referenceDate)).toBe(true);
  });

  it("should return true if the current date is more than one week before the reference date", () => {
    const currentDate = new Date("2023-01-15");
    const referenceDate = new Date("2023-01-30");
    expect(isDateOneWeekBefore(currentDate, referenceDate)).toBe(false);
  });

  it("should return false if the current date is less than one week before the reference date", () => {
    const currentDate = new Date("2023-01-25");
    const referenceDate = new Date("2023-01-30");
    expect(isDateOneWeekBefore(currentDate, referenceDate)).toBe(false);
  });

  it("should return false if the current date is the same as the reference date", () => {
    const currentDate = new Date("2023-01-30");
    const referenceDate = new Date("2023-01-30");
    expect(isDateOneWeekBefore(currentDate, referenceDate)).toBe(false);
  });

  it("should return false if the current date is after the reference date", () => {
    const currentDate = new Date("2023-02-06");
    const referenceDate = new Date("2023-01-30");
    expect(isDateOneWeekBefore(currentDate, referenceDate)).toBe(false);
  });
});
