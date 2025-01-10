import {useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import Modal from "./Modal";
import SignIn from "./SignIn";

const Navbar = () => {
  const {profile, signOut} = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
  };

  return (
    <>
      <nav className="flex justify-end items-center mb-8 px-4">
        {profile && (
          <div className="relative">
            {profile?.avatar_url ? (
              <div className="w-10 h-10 rounded-full bg-cover bg-center cursor-pointer" style={{backgroundImage: `url(${profile.avatar_url})`}} onClick={toggleDropdown} />
            ) : (
              <div className="w-10 h-10 rounded-full bg-lime-600 flex items-center justify-center text-white cursor-pointer" onClick={toggleDropdown}>
                {profile?.username?.charAt(0).toUpperCase()}
              </div>
            )}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg z-10">
                <div className="py-2">
                  <button className="block w-full text-left px-4 py-2 hover:bg-zinc-700 focus:outline-none" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!profile && (
          <div>
            <button className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 mr-2" onClick={() => openLoginModal()}>
              Login
            </button>
            <button className="bg-transparent hover:bg-lime-50 hover:text-gray-800 text-lime-600 font-bold py-2 px-4 rounded-md border-2 border-lime-600" onClick={openSignUpModal}>
              Signup
            </button>
          </div>
        )}
      </nav>
      <Modal onClose={closeModal} isOpen={showModal} children={<SignIn isLoginModal={isLoginModal} toggleModal={toggleModal} closeModal={closeModal} />} />
    </>
  );
};

export default Navbar;
