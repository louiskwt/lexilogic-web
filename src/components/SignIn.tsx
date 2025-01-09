import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuthContext} from "../contexts/AuthContext";

interface ISignInProps {
  isLoginModal: boolean;
  toggleModal: () => void;
  closeModal: () => void;
}

const SignIn = ({isLoginModal, toggleModal, closeModal}: ISignInProps) => {
  const {signInWithGoogle} = useAuthContext();

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    closeModal();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg p-6 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{isLoginModal ? "Login" : "Signup"}</h2>
        <div className="flex flex-col space-y-4">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center" onClick={handleGoogleSignIn}>
            <FontAwesomeIcon className="mr-2" icon={faGoogle} />
            Sign in with Google
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <input type="email" placeholder="Email" autoComplete="off" className="bg-zinc-700 rounded-md border-2 border-zinc-600 py-2 px-4 focus:outline-none focus:border-lime-600" />
          <input type="password" placeholder="Password" autoComplete="off" className="bg-zinc-700 rounded-md border-2 border-zinc-600 py-2 px-4 focus:outline-none focus:border-lime-600" />
          <button className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">{isLoginModal ? "Login" : "Signup"}</button>
          <button onClick={toggleModal} className="text-gray-400 hover:text-gray-200 font-medium">
            {isLoginModal ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
