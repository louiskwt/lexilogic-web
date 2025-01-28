import {User} from "@supabase/supabase-js";
import Compressor from "compressorjs";
import {ChangeEvent, useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {useLanguageContext} from "../contexts/LanguageContext";
import supabase from "../supabaseClient";
import Modal from "./Modal";

interface SetupProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const SetupProfileModal: React.FC<SetupProfileModalProps> = ({user, isOpen, onClose}) => {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const [avatar, setAvatar] = useState<File | Blob | null>(null);
  const {t} = useLanguageContext();
  const {signOut, profile} = useAuthContext();
  const handleLanguageChange = (lang: "zh" | "en") => {
    setLanguage(lang);
  };

  useEffect(() => {
    if (profile) {
      setLanguage(profile.meaning_lang);
      setUsername(profile.username);
    }
  }, [profile]);

  const handleSubmit = async () => {
    if (username === "") {
      alert(t("warning.missingUsername"));
      return;
    }

    if (profile?.username !== username) {
      const {data: userData, error: profileError} = await supabase.from("profiles").select("username").eq("username", username).limit(1).maybeSingle();
      if (userData) {
        alert(t("warning.usernameTaken"));
        return;
      }
      if (profileError) {
        alert(t("warning.authError"));
        signOut();
        return;
      }
    }

    if (user) {
      try {
        const payload = {
          ...(username === profile?.username ? {username} : {}),
          avatar_url: avatar ? await uploadAvatar(avatar) : null,
          meaning_lang: language,
        };
        const {data, error} = await supabase.from("profiles").update([payload]).eq("id", user.id);

        if (error) {
          console.error("Error creating user profile:", error);
          t("warning.authError");
          signOut();
        } else {
          console.log("User profile created:", data);
          onClose();
          window.location.reload();
          alert(t("profileSaved"));
        }
      } catch (error) {
        console.error("Error creating user profile:", error);
      }
    }
  };

  const uploadAvatar = async (file: File | Blob): Promise<string | null> => {
    if (!user) return null;
    try {
      const {data, error} = await supabase.storage.from("avatars").upload(`${user.id}/avatar`, file, {
        cacheControl: "3600",
        upsert: true,
      });
      if (error) {
        console.error("Error uploading avatar:", error);
        return null;
      }
      return data.path;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      return null;
    }
  };

  const handleAvatarImage = (e: ChangeEvent<HTMLInputElement>) => {
    const maximumSize = 10 * 1024 * 1024; // In MegaBytes

    const image = e.target.files?.[0];
    if (!image) {
      return;
    }

    if (image.size > maximumSize) {
      alert("warning.imageSizeError");
      return;
    }

    new Compressor(image, {
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,

      success(compressedImage) {
        setAvatar(compressedImage);
      },
      error(err) {
        console.log(err.message);
        alert(t("warning.imageError"));
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-zinc-800 d-flex justify-center rounded-lg p-6 shadow-md w-full max-w-md items-center">
        <h2 className="text-2xl font-bold mb-4">{t("setUpProfile")}</h2>
        <div className="flex flex-col space-y-4">
          <label className="block text-gray-400" htmlFor="avatar">
            {t("username")}
          </label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-zinc-700 rounded-md border-2 border-zinc-600 py-2 px-4 focus:outline-none focus:border-lime-600" />
          <div className="flex flex-col">
            <label className="block text-gray-400 mr-4 mb-4" htmlFor="language">
              {t("meaning_lang")}
            </label>
            <div className="flex">
              <button type="button" onClick={() => handleLanguageChange("en")} className={`px-4 py-2 rounded-l-md ${language === "en" ? "bg-lime-600 text-white" : "bg-zinc-700 text-gray-400 hover:bg-zinc-600"}`}>
                {t("lang_code.en")}
              </button>
              <button type="button" onClick={() => handleLanguageChange("zh")} className={`px-4 py-2 rounded-r-md ${language === "zh" ? "bg-lime-600 text-white" : "bg-zinc-700 text-gray-400 hover:bg-zinc-600"}`}>
                {t("lang_code.zh")}
              </button>
            </div>
          </div>
          <label className="block text-gray-400 mb-2" htmlFor="avatar">
            {t("avatar")}
          </label>
          <input type="file" id="avatar" onChange={(e) => handleAvatarImage(e)} className="bg-zinc-700 rounded-md border-2 border-zinc-600 py-2 px-4 focus:outline-none focus:border-lime-600" />
          <button onClick={handleSubmit} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">
            {t("saveProfile")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SetupProfileModal;
