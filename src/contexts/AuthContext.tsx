import {Session, User} from "@supabase/supabase-js";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import SetupProfileModal from "../components/SetupProfileModal";
import supabase from "../supabaseClient";

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
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  profile: null,
  signInWithGoogle: async () => {},
  signInWithEmail: async (email, password) => {},
  signOut: async () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useWordleContext must be used withint a WordlerProvder");
  return context;
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileSetUpModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({data: {session}}) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      // Check if the user has a profile set up
      if (session?.user) {
        const {data, error} = await supabase.from("profiles").select("*").eq("id", session.user.id);
        console.log(data);

        if (error) {
          console.error("Error fetching user profile:", error);
        } else if (data.length === 0) {
          // User has no profile set up, open the profile setup modal
          console.log(data);
          setIsProfileModalOpen(true);
        } else {
          setUserProfile(data[0]);
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
  };

  const closeModal = () => setIsProfileModalOpen(false);

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
      }}>
      {children}
      <SetupProfileModal user={user} isOpen={isProfileSetUpModalOpen} onClose={closeModal} />
    </AuthContext.Provider>
  );
};
