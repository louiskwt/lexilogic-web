import {LangaugeOptions} from "@/types/index.ts";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {beforeEach, describe, expect, it, vi} from "vitest";
import RankingModalContent from "../components/RankingModalContent.tsx";
import {AuthContext, AuthProvider} from "../contexts/AuthContext";
import {LanguageProvider} from "../contexts/LanguageContext";
import "../i18n.ts";

describe("Ranking Model Content", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render Ranking Model Content properly and prompt user to login when not logged in", () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <AuthProvider>
            <RankingModalContent />
          </AuthProvider>
        </LanguageProvider>
      </MemoryRouter>
    );

    // Assert that the expected elements are rendered
    expect(screen.getAllByText("Please log in to view the rankings")).toBeDefined();
    expect(screen.getAllByText("Log In")).toBeDefined();
  });

  it("should render Ranking Model Content and display user info properly", () => {
    const mockAuthValue = {
      user: null,
      profile: {
        avatar_url: "url",
        full_name: "testing",
        id: "21234",
        updated_at: "2023-12-23",
        username: "testinguser",
        website: "",
        weekly_xp: 123,
        total_xp: 1223,
        meaning_lang: "en" as LangaugeOptions,
      },
      session: null,
      isLoading: false,
      signInWithGoogle: vi.fn(),
      signInWithEmail: vi.fn(),
      signOut: vi.fn(),
      closeModal: vi.fn(),
      showModal: false,
      openLoginModal: vi.fn(),
      openSignUpModal: vi.fn(),
      toggleModal: vi.fn(),
      signUpWithEmail: vi.fn(),
      isProfileSetUpModalOpen: false,
      setIsProfileModalOpen: vi.fn(),
      handleProfileUpdate: vi.fn(),
    };

    render(
      <MemoryRouter>
        <LanguageProvider>
          <AuthContext.Provider value={mockAuthValue}>
            <RankingModalContent />
          </AuthContext.Provider>
        </LanguageProvider>
      </MemoryRouter>
    );

    // Assert that the expected elements are rendered
    expect(screen.getAllByText("Hi testinguser")).toBeDefined();
    expect(screen.getAllByText("Total XP: 1223")).toBeDefined();
  });
});
