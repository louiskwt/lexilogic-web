// import {ProfileData} from "@/types";
// import {Session, User} from "@supabase/supabase-js";
// import {createContext, ReactNode, useContext, useEffect, useState} from "react";

// interface UserProfile {
//   avatar_url: string;
//   full_name: string;
//   id: string;
//   updated_at: string;
//   username: string;
//   website: string;
// }

// type AuthContextType = {
//   user: User | null;
//   profile: (UserProfile & ProfileData) | null;
//   session: Session | null;
//   isLoading: boolean;
//   showModal: boolean;
//   isProfileSetUpModalOpen: boolean;
//   signInWithGoogle: () => Promise<void>;
//   signInWithEmail: (email: string, password: string) => Promise<void>;
//   signUpWithEmail: (email: string, password: string) => Promise<void>;
//   setIsProfileModalOpen: (state: boolean) => void;
//   signOut: () => Promise<void>;
//   closeModal: () => void;
//   openLoginModal: () => void;
//   openSignUpModal: () => void;
//   toggleModal: () => void;
//   handleProfileUpdate: (p: ProfileData & UserProfile) => void;
// };

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) throw new Error("useAtuh must be used withint a AuthProvder");
//   return context;
// };

// export const AuthProvider = ({children}: {children: ReactNode}) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setUserProfile] = useState<(UserProfile & ProfileData) | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isProfileSetUpModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoginModal, setIsLoginModal] = useState(true);
//   const {t} = useLanguageContext();

//   useEffect(() => {
//     console.log("ok");
//     // supabase.auth.getSession().then(async ({data: {session}}) => {
//     //   setSession(session);
//     //   setUser(session?.user ?? null);
//     //   setIsLoading(false);
//     //   // Check if the user has a profile set up
//     //   if (session?.user) {
//     //     const {data, error} = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
//     //     if (error) {
//     //       console.error("Error fetching user profile:", error);
//     //       alert(t("authError"));
//     //       signOut();
//     //       setUser(null);
//     //       return;
//     //     }
//     //     if (data) {
//     //       if (!data.username) setIsProfileModalOpen(true);
//     //       setUserProfile(data);
//     //       storeMeaningLangPreference(data.meaning_lang || "zh");
//     //     }
//     //   }
//   }, []);

//   const toggleModal = () => {
//     setIsLoginModal(!isLoginModal);
//   };

//   const openLoginModal = () => {
//     setShowModal(true);
//     setIsLoginModal(true);
//   };

//   const openSignUpModal = () => {
//     setShowModal(true);
//     setIsLoginModal(false);
//   };

//   const closeModal = () => setShowModal(false);

//   const closeProfileSetUpModal = () => setIsProfileModalOpen(false);
//   const handleProfileUpdate = (p: UserProfile & ProfileData) => {
//     setUserProfile(p);
//   };

//   return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
// };
