import {Link} from "react-router";

const Navbar = () => {
  return (
    <nav className="flex justify-end items-end mb-8 px-4">
      <div>
        <Link to="/login" className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 mr-2">
          Login
        </Link>
        <Link to="/signup" className="bg-transparent hover:bg-lime-50 hover:text-gray-800 text-lime-600 font-bold py-2 px-4 rounded-md border-2 border-lime-600">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
