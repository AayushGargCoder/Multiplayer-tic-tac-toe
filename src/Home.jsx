import { useNavigate } from "react-router-dom";
import { IoPlayOutline } from "react-icons/io5";
import { HiDesktopComputer } from "react-icons/hi";
import { IoIosGlobe } from "react-icons/io";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      <button
        onClick={() => navigate("/options")}
        className="flex items-center space-x-2 px-6 py-3 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <div className="text-3xl">
          <IoPlayOutline />
        </div>
        <div className="text-xl">
          <HiDesktopComputer />
        </div>
      </button>
      <button
        onClick={() => navigate("/options")}
        className="flex items-center space-x-2 px-6 py-3 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <div className="text-3xl">
          <IoPlayOutline />
        </div>
        <div className="text-xl">
          <IoIosGlobe />
        </div>
      </button>
    </div>
  );
};

export default Home;
