import { Sling } from "hamburger-react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useContext, useEffect, useState } from "react";
import { SidebarConetext } from "../../context/SidebarContext";
import { NavbarHeadingContext } from "../../context/NavbarHeadingContext";
import { useNavigate } from "react-router-dom";
import { LogoutContext } from "../../context/LogoutContext";
import { ConfirmLogoutContext } from "../../context/ConfirmLogoutContext";
import { IsUserAdminContext } from "../../context/IsUserAdminContext";
import { EmployeeProfileContext } from "../../context/EmployeeProfileContext";

const Navbar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarConetext);
  const { navHeading } = useContext(NavbarHeadingContext);
  const { logout, setLogout } = useContext(LogoutContext);
  const { confirmLogout, setConfirmLogout } = useContext(ConfirmLogoutContext);
  const { isUserAdmin, setIsUserAdmin } = useContext(IsUserAdminContext);
  const { isEmployeeProfileActive, setIsEmployeeProfileActive } = useContext(
    EmployeeProfileContext
  );

  const navigate = useNavigate();

  // LOGOUT PROCESS
  const handleLogout = () => {
    setLogout(!logout);
  };

  useEffect(() => {
    if (confirmLogout) {
      navigate("/");
    }
    setConfirmLogout(false);
    setLogout(false);
    setIsEmployeeProfileActive(false);
  }, [confirmLogout]);

  return (
    <nav className="w-full h-[70px] border border-gray-700 bg-gray-800 z-20 fixed">
      <div
        className={`w-full max-w-[1600px] h-full mx-auto px-5 max-md:px-3 flex items-center relative ${
          isUserAdmin?.type == "Admin" ? "justify-between" : "justify-center"
        }`}
      >
        {isUserAdmin?.type === "Admin" && (
          <Sling
            size={24}
            toggled={isSidebarOpen}
            toggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}

        <span className="text-lg max-md:text-[17px] tracking-widest max-md:text-center">
          {navHeading}
        </span>
        {isUserAdmin?.type === "Admin" ? (
          <PowerSettingsNewIcon
            onClick={handleLogout}
            sx={{
              fontSize: "30px",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "10px",
              boxSizing: "content-box",
              color: "red",
              transition: "all 0.3s ease",
              ":hover": {
                backgroundColor: "red",
                color: "white",
              },
              ...(isUserAdmin.type !== "Admin" && {
                position: "absolute",
                right: "1%",
              }),
            }}
          />
        ) : (
          <div
            className={`w-[42px] h-[42px] max-sm:w-[33px] max-sm:h-[33px] rounded-full cursor-pointer bg-transparent flex justify-center items-center overflow-hidden outline ${
              isEmployeeProfileActive && " outline-blue-500"
            } ${
              isUserAdmin.type !== "Admin" &&
              "absolute right-[2%] max-sm:right-[5%]"
            }`}
            onClick={() => setIsEmployeeProfileActive(!isEmployeeProfileActive)}
          >
            {isUserAdmin?.profileImage ? (
              <img
                src={isUserAdmin.profileImage}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : (
              <span className="text-white font-bold">
                {isUserAdmin.name?.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
