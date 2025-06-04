import { useContext, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { NavbarHeadingContext } from "../../context/NavbarHeadingContext";
import LogoutUi from "../../components/logoutui/LogoutUi";
import DeleteEmployeesComponent from "../../components/deleteemployees/DeleteEmployeesComponent";
import { AllEmployeesContext } from "../../context/AllEmployeesContext";
import axios from "axios";
import { IsUserAdminContext } from "../../context/IsUserAdminContext";
import DeleteEmployeeUi from "../../components/deleteConfirmation/DeleteEmployeeUi";
import DeleteEmployeePopupContext from "../../components/popups/DeleteEmployeePopupContext";
import apiUrl from "../../config";

const AdminDashboard = () => {
  const { setNavHeading } = useContext(NavbarHeadingContext);
  const { allEmployees, setAllEmployees } = useContext(AllEmployeesContext);
  const { isUserAdmin, setIsUserAdmin } = useContext(IsUserAdminContext);

  useEffect(() => {
    setNavHeading("DASHBOARD");
  }, []);

  // FETCH ALL-EMPLOYEES DATA
  const allEmployeeData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/employees/employees`);
      const data = await res.data;
      setAllEmployees(data.allEmployees);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allEmployeeData();
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
    <div className="w-full h-screen bg-gray-900 text-white relative">
      <Navbar />
      <Sidebar />
      <DeleteEmployeesComponent />
      <DeleteEmployeeUi />
      <DeleteEmployeePopupContext />
      <LogoutUi />
    </div>
  );
};

export default AdminDashboard;
