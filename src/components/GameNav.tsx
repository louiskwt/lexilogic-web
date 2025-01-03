import {faChartSimple, faCircleQuestion, faGear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <nav className="bg-zinc-800 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <span className="mr-4 text-xl">🇺🇸</span>
        <span className="text-lg font-medium">EN-US</span>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded">
            <FontAwesomeIcon icon={faChartSimple} size="lg" />
          </button>
        </div>
        <div className="mr-4">
          <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded">
            <FontAwesomeIcon icon={faGear} size="lg" />
          </button>
        </div>
        <div>
          <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded">
            <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
