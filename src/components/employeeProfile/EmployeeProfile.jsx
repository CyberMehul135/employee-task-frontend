import { useContext, useEffect, useState } from "react";
import { EmployeeProfileContext } from "../../context/EmployeeProfileContext";
import { ConfirmLogoutContext } from "../../context/ConfirmLogoutContext";
import { LogoutContext } from "../../context/LogoutContext";
import { useNavigate } from "react-router-dom";
import { IsUserAdminContext } from "../../context/IsUserAdminContext";
import axios from "axios";
import { SavedDetailsPopupContext } from "../../context/SavedDetailsPopupContext";
import apiUrl from "../../config";

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const { isEmployeeProfileActive, setIsEmployeeProfileActive } = useContext(
    EmployeeProfileContext
  );
  const { isUserAdmin, setIsUserAdmin } = useContext(IsUserAdminContext);
  const { confirmLogout, setConfirmLogout } = useContext(ConfirmLogoutContext);
  const { logout, setLogout } = useContext(LogoutContext);
  const { isDetailsSaved, setIsDetailsSaved } = useContext(
    SavedDetailsPopupContext
  );

  const [edit, setEdit] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${apiUrl}/api/employees/employees/editemployee`,
        { isUserAdmin }
      );
      const data = res.data.employee;
      if (data) {
        detailsSavedPopup();
      } else {
        alert("Fail");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // SAVED DETAILS-POPUP
  const detailsSavedPopup = () => {
    setIsDetailsSaved(true);
    setTimeout(() => {
      setIsDetailsSaved(false);
    }, 2000);
  };

  const handleEdit = (e) => {
    const { name } = e.target;
    setEdit({ ...edit, [name]: !edit[name] });
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      const file = files[0];
      if (file) {
        const imagePath = await uploadImage(file);
        if (imagePath) {
          setIsUserAdmin({ ...isUserAdmin, profileImage: imagePath });
        }
      }
    } else {
      setIsUserAdmin({ ...isUserAdmin, [name]: value });
    }
  };

  // UPLOAD IMAGE
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "employee_uploads");
    formData.append("cloud_name", "dms1w14k1");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dms1w14k1/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Image upload failed", err);
      return null;
    }
  };

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
  }, [confirmLogout]);

  // HANDLE CLICK
  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsEmployeeProfileActive(false);
    }
  };

  return (
    <div
      className={`fixed top-[73px] w-full h-full  transition-all duration-500 ease-in-out  ${
        isEmployeeProfileActive
          ? "right-1 bg-black bg-opacity-50"
          : "-right-[330px]"
      }`}
      onClick={handleClick}
    >
      <div className="ml-auto w-[330px] h-auto bg-gray-800 border border-gray-700 rounded-md px-6 py-5 flex flex-col items-center">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="font-semibold text-[17px] text-gray-300">
            PROFILE DETAILS
          </div>
          {/* Input-Image */}
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mt-5 mb-3 relative group bg-white flex justify-center items-center outline">
            {isUserAdmin.profileImage ? (
              <img
                src={isUserAdmin.profileImage}
                className="w-full h-full object-cover"
                alt="profile"
              />
            ) : (
              <span className="text-black text-5xl font-bold">
                {isUserAdmin?.name?.slice(0, 2).toUpperCase()}
              </span>
            )}

            <label
              htmlFor="profile-upload"
              className="absolute bottom-2 right-2 bg-black/60 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Edit
            </label>
            <input
              className="hidden"
              id="profile-upload"
              type="file"
              name="profileImage"
              onChange={handleChange}
            />
          </div>
          <div className="font-semibold text-[17px]">{isUserAdmin.name}</div>
          <div className="text-sm text-gray-300">Engineer</div>
          {/* Input-Details */}
          <div className="mt-[30px] flex flex-col w-full">
            <div className="py-2 border-t border-gray-600 flex items-center justify-start">
              <span className="w-[24%]">Name</span>
              <span className="w-[76%] text-[15px] text-gray-300">
                {edit.name ? (
                  <input
                    className="bg-gray-800 focus:outline-none focus:outline-offset-0"
                    type="text"
                    name="name"
                    value={isUserAdmin.name}
                    onChange={handleChange}
                  />
                ) : (
                  isUserAdmin.name
                )}
              </span>
              <span className="w-[8%] cursor-pointer">
                {edit.name ? (
                  <button
                    name="name"
                    className="bg-blue-500 text-white px-[6px] rounded-xl"
                    onClick={handleEdit}
                  >
                    ✓
                  </button>
                ) : (
                  <img
                    src="/edit.png"
                    className="w-full h-full"
                    alt="edit-png"
                    name="name"
                    onClick={handleEdit}
                  />
                )}
              </span>
            </div>
            <div className="py-2 border-t border-gray-600 flex items-center justify-start">
              <span className="w-[24%]">Email</span>
              <span className="w-[76%] text-[15px] text-gray-300">
                {edit.email ? (
                  <input
                    className="bg-gray-800 focus:outline-none focus:outline-offset-0"
                    type="email"
                    name="email"
                    value={isUserAdmin.email}
                    onChange={handleChange}
                  />
                ) : (
                  isUserAdmin.email
                )}
              </span>
              <span className="w-[8%] cursor-pointer">
                {edit.email ? (
                  <button
                    name="email"
                    className="bg-blue-500 text-white px-[6px] rounded-xl"
                    onClick={handleEdit}
                  >
                    ✓
                  </button>
                ) : (
                  <img
                    src="/edit.png"
                    className="w-full h-full"
                    alt="edit-png"
                    name="email"
                    onClick={handleEdit}
                  />
                )}
              </span>
            </div>
            <div className="py-2 border-t border-gray-600 flex items-center justify-start">
              <span className="w-[24%]">Phone</span>
              <span className="w-[76%] text-[15px] text-gray-300">
                {edit.phone ? (
                  <input
                    className="bg-gray-800 focus:outline-none focus:outline-offset-0"
                    type="type"
                    name="phone"
                    value={isUserAdmin.phone}
                    onChange={handleChange}
                  />
                ) : (
                  isUserAdmin.phone
                )}
              </span>
              <span className="w-[8%] cursor-pointer">
                {edit.phone ? (
                  <button
                    name="phone"
                    className="bg-blue-500 text-white px-[6px] rounded-xl"
                    onClick={handleEdit}
                  >
                    ✓
                  </button>
                ) : (
                  <img
                    src="/edit.png"
                    className="w-full h-full"
                    alt="edit-png"
                    name="phone"
                    onClick={handleEdit}
                  />
                )}
              </span>
            </div>
            <div className="py-2 border-y border-gray-600 flex items-center justify-start">
              <span className="w-[24%]">Address</span>
              <span className="w-[76%] text-[15px] text-gray-300">
                {edit.address ? (
                  <input
                    className="bg-gray-800 focus:outline-none focus:outline-offset-0"
                    type="type"
                    name="address"
                    value={isUserAdmin.address}
                    onChange={handleChange}
                  />
                ) : (
                  isUserAdmin.address
                )}
              </span>
              <span className="w-[8%] cursor-pointer">
                {edit.address ? (
                  <button
                    name="address"
                    className="bg-blue-500 text-white px-[6px] rounded-xl"
                    onClick={handleEdit}
                  >
                    ✓
                  </button>
                ) : (
                  <img
                    src="/edit.png"
                    className="w-full h-full"
                    alt="edit-png"
                    name="address"
                    onClick={handleEdit}
                  />
                )}
              </span>
            </div>

            <button className="bg-blue-500 px-5 py-1 rounded-sm hover:bg-blue-600 active:bg-blue-800 mt-5 mr-auto">
              Save
            </button>
          </div>
        </form>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-5 rounded-sm  absolute top-[68%] mt-[3px] right-[2%]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfile;
