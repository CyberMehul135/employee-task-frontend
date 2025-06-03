import { useContext, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { NavbarHeadingContext } from "../../context/NavbarHeadingContext";
import CreateEmployeesForm from "../../components/employeesForm/CreateEmployeesForm";
import LogoutUi from "../../components/logoutui/LogoutUi";
import { IsUserAdminContext } from "../../context/IsUserAdminContext";
import axios from "axios";
import CreateEmployeePopup from "../../components/popups/CreateEmployeePopup";
import apiUrl from "../../config";

const CreateEmployees = () => {
  const { setNavHeading } = useContext(NavbarHeadingContext);
  const { isUserAdmin, setIsUserAdmin } = useContext(IsUserAdminContext);

  useEffect(() => {
    setNavHeading("CREATE EMPLOYEES");
  }, []);

  // FETCH ADMIN-DATA
  const email = JSON.parse(localStorage.getItem("data"));

  const dataFetch = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/employees/employees/${email}`);
      if (res.data.admin) {
        setIsUserAdmin(res.data.admin);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div className="bg-gray-900 text-white relative w-full h-screen">
      <Navbar />
      <Sidebar />
      <CreateEmployeesForm />
      <CreateEmployeePopup />
      <LogoutUi />
    </div>
  );
};

export default CreateEmployees;
