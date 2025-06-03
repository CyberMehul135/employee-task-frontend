import { useContext, useEffect, useState } from "react";
import { NavbarHeadingContext } from "../../context/NavbarHeadingContext";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TaskAssignForm from "../../components/employeesForm/TaskAssignForm";
import LogoutUi from "../../components/logoutui/LogoutUi";
import { IsUserAdminContext } from "../../context/IsUserAdminContext";
import axios from "axios";
import TaskAssignedPopup from "../../components/popups/TaskAssignedPopup";
import apiUrl from "../../config";

const TaskAssign = () => {
  const { setNavHeading } = useContext(NavbarHeadingContext);
  const { isUserAdmin, setIsUserAdmin } = useContext(IsUserAdminContext);

  useEffect(() => {
    setNavHeading("TASK ASSIGN");
  }, []);

  // FETCH ADMIN-DATA
  const email = JSON.parse(localStorage.getItem("data"));

  const dataFetch = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/employees/employees/${email}`
      );
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
    <div className="w-full h-full bg-gray-900 text-white ">
      <Navbar />
      <Sidebar />
      <TaskAssignForm />
      <TaskAssignedPopup />
      <LogoutUi />
    </div>
  );
};

export default TaskAssign;
