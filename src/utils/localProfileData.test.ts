import {ProfileData} from "@/types";
import {describe, expect, it, vi} from "vitest";
import {getLocalProfileData} from ".";

describe("getLocalProfileData", () => {
  it("should return null if no profile data is stored in localStorage", () => {
    // Mock the localStorage.getItem method to return null
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    const profileData = getLocalProfileData();
    expect(profileData).toBeNull();
  });

  it("should return the profile data stored in localStorage", () => {
    const mockProfileData: ProfileData = {weekly_xp: 120, total_xp: 120, meaning_lang: "zh"};
    // Mock the localStorage.getItem method to return the mock profile data
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(mockProfileData));
    const profileData = getLocalProfileData();
    expect(profileData).toEqual(mockProfileData);
  });
});
