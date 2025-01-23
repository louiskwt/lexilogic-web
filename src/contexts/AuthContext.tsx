import {Session, User} from "@supabase/supabase-js";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import Modal from "../components/Modal";
import SetupProfileModal from "../components/SetupProfileModal";
import SignIn from "../components/SignIn";
import supabase from "../supabaseClient";
import {ProfileData} from "../utils";
import {useLanguageContext} from "./LanguageContext";

interface UserProfile {
  avatar_url: string;
  full_name: string;
  id: string;
  updated_at: string;
  username: string;
  website: string;
}

type AuthContextType = {
  user: User | null;
  profile: (UserProfile & ProfileData) | null;
  session: Session | null;
  isLoading: boolean;
  showModal: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  closeModal: () => void;
  openLoginModal: () => void;
  openSignUpModal: () => void;
  toggleModal: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useWordleContext must be used withint a WordlerProvder");
  return context;
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setUserProfile] = useState<(UserProfile & ProfileData) | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileSetUpModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const {t} = useLanguageContext();

  useEffect(() => {
    supabase.auth.getSession().then(async ({data: {session}}) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      // Check if the user has a profile set up
      if (session?.user) {
        const {data, error} = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
        if (error) {
          console.error("Error fetching user profile:", error);
          alert(t("authError"));
          signOut();
          setUser(null);
        } else if (!data.username) {
          // User has no profile set up, open the profile setup modal
          setIsProfileModalOpen(true);
          setUserProfile(data);
        } else {
          setUserProfile(data);
        }
      }
    });

    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const {data, error} = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        // Additional actions, such as storing the user in the context or local storage
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const signInWithEmail = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const toggleModal = () => {
    setIsLoginModal(!isLoginModal);
  };

  const openLoginModal = () => {
    setShowModal(true);
    setIsLoginModal(true);
  };

  const openSignUpModal = () => {
    setShowModal(true);
    setIsLoginModal(false);
  };

  const closeModal = () => setShowModal(false);

  const closeProfileSetUpModal = () => setIsProfileModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        signInWithGoogle,
        signInWithEmail,
        signOut,
        closeModal,
        showModal,
        openLoginModal,
        openSignUpModal,
        toggleModal,
        signUpWithEmail,
      }}>
      {children}
      <Modal onClose={closeModal} isOpen={showModal}>
        <SignIn isLoginModal={isLoginModal} toggleModal={toggleModal} closeModal={closeModal} />
      </Modal>
      <SetupProfileModal user={user} isOpen={isProfileSetUpModalOpen} onClose={closeProfileSetUpModal} />
    </AuthContext.Provider>
  );
};
