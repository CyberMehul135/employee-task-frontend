import { useContext } from "react";
import { LogoutContext } from "../../context/LogoutContext";
import { ConfirmLogoutContext } from "../../context/ConfirmLogoutContext";

const LogoutUi = () => {
  const { logout, setLogout } = useContext(LogoutContext);
  const { setConfirmLogout } = useContext(ConfirmLogoutContext);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen z-20 bg-gray-900 bg-opacity-50 px-5 py-2 flex items-center justify-center transition-all ${
        logout ? "scale-100 duration-300" : "scale-0 duration-200"
      }`}
    >
      <div className="w-full h-full max-w-[600px] max-h-[200px] bg-gray-700 mx-auto flex flex-col justify-center items-center rounded-sm">
        <p className="text-2xl font-normal text-center mt-2 max-md:text-[17px]">
          Are You Sure! You Want to Logout.
        </p>
        <div className="mt-[30px] flex gap-5 justify-center">
          <button
            className="px-10 py-2 bg-white text-black rounded-sm hover:bg-gray-300 active:bg-white transition-all duration-2000"
            onClick={() => setLogout(false)}
          >
            NO
          </button>
          <button
            className="px-10 py-2 bg-blue-500 rounded-sm hover:bg-blue-600 active:bg-blue-800 transition-all duration-2000"
            onClick={() => setConfirmLogout(true)}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutUi;
