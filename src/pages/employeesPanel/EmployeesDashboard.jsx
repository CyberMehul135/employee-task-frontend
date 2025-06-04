import { useContext, useEffect } from "react";
import { NavbarHeadingContext } from "../../context/NavbarHeadingContext";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar/Navbar";
import StateCard from "../../components/statecard/StateCard";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import LogoutUi from "../../components/logoutui/LogoutUi";
import { IsUserAdminContext } from "../../context/IsUserAdminContext";
import EmployeeProfile from "../../components/employeeProfile/EmployeeProfile";
import SavedDetailsPopup from "../../components/popups/SavedDetailsPopup";
import apiUrl from "../../config";

const EmployeesDashboard = () => {
  const { setNavHeading } = useContext(NavbarHeadingContext);
  const { isUserAdmin, setIsUserAdmin } = useContext(IsUserAdminContext);
  const [employee, setEmployee] = useState({ tasks: [] });

  const allDates = [];
  const employeeTasks = employee.tasks.forEach((task) =>
    allDates.push(task.date)
  );
  const filterDates = [...new Set(allDates)];
  const decendingDates = filterDates.sort((a, b) => new Date(b) - new Date(a));

  // API DATA FETCH
  const email = JSON.parse(localStorage.getItem("data"));

  const dataFetch = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/employees/employees/${email}`);
      if (res.data.employee) {
        setEmployee(res.data.employee);
        setIsUserAdmin(res.data.employee);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  // VALUES
  let newTask = employee?.tasks?.filter((task) => task.newtask === true).length;
  let acceptedTask = employee?.tasks?.filter(
    (task) => task.accepted === true
  ).length;
  let completedTask = employee?.tasks?.filter(
    (task) => task.completed === true
  ).length;
  let failedTask = employee?.tasks?.filter(
    (task) => task.failed === true
  ).length;

  useEffect(() => {
    setNavHeading("EMPLOYEES DASHBOARD");
  }, [setNavHeading]);

  const handleWork = async (e) => {
    const role = e.target.getAttribute("data-role");
    const taskId = e.target.getAttribute("data-id");
    const employeeId = employee._id;
    if (role === "accept-button") {
      try {
        const res = await axios.patch(`${apiUrl}/api/employees/edit`, {
          employeeId,
          taskId,
          action: "accepted",
        });
        setEmployee(res.data.employee);
      } catch (err) {
        console.log(err);
        alert("Fail");
      }
    }

    if (role === "completed-btn") {
      try {
        const res = await axios.patch(`${apiUrl}/api/employees/edit`, {
          employeeId,
          taskId,
          action: "completed",
        });
        setEmployee(res.data.employee);
      } catch (err) {
        console.log(err);
      }
    }

    if (role === "failed-btn") {
      try {
        const res = await axios.patch(`${apiUrl}/api/employees/edit`, {
          employeeId,
          taskId,
          action: "failed",
        });

        setEmployee(res.data.employee);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="w-full min-h-screen max-[360px]:h-full bg-gray-900 text-white relative">
      <Navbar />
      <main className="px-5 pt-[70px] relative h-full w-full max-w-[1600px] mx-auto">
        <motion.div
          className="grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[400px]:grid-cols-2 gap-3 pt-[30px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StateCard name={"New Task"} value={newTask} />
          <StateCard name={"Accepted Task"} value={acceptedTask} />
          <StateCard name={"Completed Task"} value={completedTask} />
          <StateCard name={"Failed Task"} value={failedTask} />
        </motion.div>
        {/* Tasks Date-Wise */}
        <motion.div
          className="bg-gray-900 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {decendingDates.map((date, i) => {
            return (
              <div key={i} className="mt-[20px] ">
                <div className="font-semibold">
                  DATE :{" "}
                  {date.split("").slice(0, 10).join("") ==
                  new Date().toISOString().split("T")[0]
                    ? "Today"
                    : date.split("").slice(0, 10).join("")}
                </div>
                <motion.div
                  className="h-full max-h-[280px] w-full py-5 flex flex-nowrap gap-3 overflow-x-scroll scrollbar-hidden overflow-y-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {employee?.tasks?.map((each) => {
                    if (date === each.date) {
                      return (
                        <div
                          className={`h-full min-h-[250px] w-[280px] min-w-[280px] rounded-md px-3 py-3 ${
                            each.completed
                              ? "bg-green-500"
                              : each.failed
                              ? "bg-red-500"
                              : each.accepted
                              ? "bg-orange-500"
                              : "bg-blue-500"
                          } `}
                          key={each._id}
                          onClick={handleWork}
                        >
                          <div className="flex justify-between items-center">
                            <span className="p-1.5 bg-red-500 rounded-md">
                              {each.category}
                            </span>
                            <span>
                              {each.date.split("").slice(0, 10).join("")}
                            </span>
                          </div>
                          <h3 className="text-xl mt-6">{each.taskTitle}</h3>
                          <p className="mt-2">{each.taskDescription}</p>
                          {each.accepted ? (
                            <div className="flex items-center justify-between mt-5">
                              <Button
                                variant="contained"
                                size="small"
                                color="success"
                                data-role="completed-btn"
                                data-id={each._id}
                              >
                                Completed
                              </Button>{" "}
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                data-role="failed-btn"
                                data-id={each._id}
                              >
                                Failed
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outlined"
                              size="small"
                              color="inherit"
                              style={{ marginTop: "10px" }}
                              data-role="accept-button"
                              data-id={each._id}
                            >
                              Accepted
                            </Button>
                          )}
                        </div>
                      );
                    }
                  })}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
        <LogoutUi />
      </main>
      <EmployeeProfile />
      <SavedDetailsPopup />
    </div>
  );
};

export default EmployeesDashboard;
