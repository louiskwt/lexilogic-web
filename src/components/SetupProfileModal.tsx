import {User} from "@supabase/supabase-js";
import {useState} from "react";
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
  const [avatar, setAvatar] = useState<File | null>(null);
  const {t} = useLanguageContext();

  const handleSubmit = async () => {
    if (username === "") {
      alert(t("warning.missingUsername"));
      return;
    }

    if (user) {
      try {
        const {data, error} = await supabase.from("profiles").insert([
          {
            id: user.id,
            username,
            avatar_url: avatar ? await uploadAvatar(avatar) : null,
          },
        ]);
        if (error) {
          console.error("Error creating user profile:", error);
        } else {
          console.log("User profile created:", data);
          onClose();
        }
      } catch (error) {
        console.error("Error creating user profile:", error);
      }
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-zinc-800 rounded-lg p-6 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{t("setUpProfile")}</h2>
        <div className="flex flex-col space-y-4">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-zinc-700 rounded-md border-2 border-zinc-600 py-2 px-4 focus:outline-none focus:border-lime-600" />
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="avatar">
              {t("avatar")}
            </label>
            <input type="file" id="avatar" onChange={(e) => setAvatar(e.target.files?.[0] || null)} className="bg-zinc-700 rounded-md border-2 border-zinc-600 py-2 px-4 focus:outline-none focus:border-lime-600" />
          </div>
          <button onClick={handleSubmit} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">
            {t("saveProfile")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SetupProfileModal;
