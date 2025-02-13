// import {useAuthContext} from "@/contexts/AuthContext";
// import {useLanguageContext} from "@/contexts/LanguageContext";
// import {render} from "@testing-library/react";
// import {beforeEach, describe, it, vi} from "vitest";

// vi.mock("../contexts/AuthContext");
// vi.mock("../contexts/LanguageContext");

// describe("RankingModalContent", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("should promot user to login when user is not logged in", () => {
//     vi.mocked(useAuthContext).mockReturnValue({
//       user: null,
//       profile: null,
//       session: null,
//       isLoading: false,
//       signInWithGoogle: vi.fn(),
//       signInWithEmail: vi.fn(),
//       signOut: vi.fn(),
//       closeModal: vi.fn(),
//       showModal: false,
//       openLoginModal: vi.fn(),
//       openSignUpModal: vi.fn(),
//       toggleModal: vi.fn(),
//       signUpWithEmail: vi.fn(),
//       isProfileSetUpModalOpen: false,
//       setIsProfileModalOpen: vi.fn(),
//       handleProfileUpdate: vi.fn(),
//     });
//     vi.mocked(useLanguageContext).mockReturnValue({
//       t: (key: string) => key,
//       handleChangeLanguage: vi.fn(),
//       currentLanguage: "en",
//     });
//     render();
//   });
// });
