import {describe, expect, it} from "vitest";
import {isDateOneDayBefore, isDateOneWeekBefore} from ".";

describe("isDateOneWeekBefore", () => {
  it("should return true if the current date is exactly one week before the reference date", () => {
    const currentDate = new Date("2023-01-30");
    const referenceDate = new Date("2023-01-23");
    expect(isDateOneWeekBefore(currentDate, referenceDate)).toBe(true);
  });

  it("should return false if the current date is more than one week before the reference date", () => {
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
});

describe("isDateOneDayBefore", () => {
  it("should return true if the current date is exactly one day before the reference date", () => {
    const currentDate = new Date("2024-01-23");
    const referenceDate = new Date("2023-01-24");
    expect(isDateOneDayBefore(currentDate, referenceDate)).toBe(true);
  });

  it("should return false if the current date is more than one day before the reference date", () => {
    const currentDate = new Date("2024-01-15");
    const referenceDate = new Date("2024-01-30");
    expect(isDateOneDayBefore(currentDate, referenceDate)).toBe(false);
  });

  it("should return false if the current date is less than one day before the reference date", () => {
    const currentDate = new Date("2023-01-25");
    const referenceDate = new Date("2023-01-30");
    expect(isDateOneDayBefore(currentDate, referenceDate)).toBe(false);
  });

  it("should return false if the current date is the same as the reference date", () => {
    const currentDate = new Date("2023-01-30");
    const referenceDate = new Date("2023-01-30");
    expect(isDateOneDayBefore(currentDate, referenceDate)).toBe(false);
  });
});
