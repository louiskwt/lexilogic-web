import {useState} from "react";
import Modal from "./Modal";
import SignIn from "./SignIn";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);

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

  return (
    <>
      <nav className="flex justify-end items-end mb-8 px-4">
        <div>
          <button className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 mr-2" onClick={() => openLoginModal()}>
            Login
          </button>
          <button className="bg-transparent hover:bg-lime-50 hover:text-gray-800 text-lime-600 font-bold py-2 px-4 rounded-md border-2 border-lime-600" onClick={openSignUpModal}>
            Signup
          </button>
        </div>
      </nav>
      <Modal onClose={closeModal} isOpen={showModal} children={<SignIn isLoginModal={isLoginModal} toggleModal={toggleModal} />} />
    </>
  );
};

export default Navbar;
