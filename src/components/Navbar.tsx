import {useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {useLanguageContext} from "../contexts/LanguageContext";
import supabase from "../supabaseClient";

const Navbar = () => {
  const {profile, signOut, openLoginModal, openSignUpModal} = useAuthContext();
  const {t} = useLanguageContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
  };

  useEffect(() => {
    const getProfileAvatarUrl = async () => {
      try {
        if (profile?.avatar_url) {
          const publicUrl = await supabase.storage.from("avatars").getPublicUrl(profile.avatar_url);
          setAvatarUrl(publicUrl.data.publicUrl);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProfileAvatarUrl();
  }, [profile]);

  return (
    <>
      <nav className="flex justify-end items-center mb-8 px-4">
        {profile && (
          <div className="relative">
            {avatarUrl ? (
              <div className="w-10 h-10 rounded-full bg-cover bg-center cursor-pointer" style={{backgroundImage: `url(${avatarUrl})`}} onClick={toggleDropdown} />
            ) : (
              <div className="w-10 h-10 rounded-full bg-lime-600 flex items-center justify-center text-white cursor-pointer" onClick={toggleDropdown}>
                {profile?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg z-10">
                <div className="py-2">
                  <button className="block w-full text-left px-4 py-2 hover:bg-zinc-700 focus:outline-none" onClick={handleSignOut}>
                    {t("signout")}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!profile && (
          <div>
            <button className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 mr-2" onClick={() => openLoginModal()}>
              {t("login")}
            </button>
            <button className="bg-transparent hover:bg-lime-50 hover:text-gray-800 text-lime-600 font-bold py-2 px-4 rounded-md border-2 border-lime-600" onClick={openSignUpModal}>
              {t("signup")}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
