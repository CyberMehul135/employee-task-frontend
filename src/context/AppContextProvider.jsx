import { useState } from "react";
import { AllEmployeesContext } from "./AllEmployeesContext";
import { SidebarConetext } from "./SidebarContext";
import { NavbarHeadingContext } from "./NavbarHeadingContext";
import { LogoutContext } from "./LogoutContext";
import { ConfirmLogoutContext } from "./ConfirmLogoutContext";
import { IsUserAdminContext } from "./IsUserAdminContext";
import { EmployeeProfileContext } from "./EmployeeProfileContext";
import { EmployeeCreatedPopupContext } from "./EmployeeCreatedPopupContext";
import { TaskAssignedContext } from "./TaskAssignedContext";
import { SavedDetailsPopupContext } from "./SavedDetailsPopupContext";
import { DeleteConfirmationBoxContext } from "./DeleteConfirmationBoxContext";
import { DeleteEmployeeContext } from "./DeleteEmployeeContext";
import { EmployeeToDeleteContext } from "./EmployeeToDeleteContext";
import { EmployeeDeletedPopupContext } from "./EmployeeDeletedPopupContext";

const AppContextProvider = ({ children }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navHeading, setNavHeading] = useState("");
  const [logout, setLogout] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState({});
  const [isEmployeeProfileActive, setIsEmployeeProfileActive] = useState(false);
  const [isEmployeeCreated, setIsEmployeeCreated] = useState(false);
  const [isTaskAssigned, setIsTaskAssigned] = useState(false);
  const [isDetailsSaved, setIsDetailsSaved] = useState(false);
  const [deleteConfirmationBox, setDeleteConfirmationBox] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isEmployeeDeleted, setIsEmployeeDeleted] = useState(false);

  return (
    <EmployeeDeletedPopupContext.Provider
      value={{ isEmployeeDeleted, setIsEmployeeDeleted }}
    >
      <EmployeeToDeleteContext.Provider
        value={{ employeeToDelete, setEmployeeToDelete }}
      >
        <DeleteEmployeeContext.Provider
          value={{ deleteEmployee, setDeleteEmployee }}
        >
          <DeleteConfirmationBoxContext.Provider
            value={{ deleteConfirmationBox, setDeleteConfirmationBox }}
          >
            <SavedDetailsPopupContext.Provider
              value={{ isDetailsSaved, setIsDetailsSaved }}
            >
              <TaskAssignedContext.Provider
                value={{ isTaskAssigned, setIsTaskAssigned }}
              >
                <EmployeeCreatedPopupContext.Provider
                  value={{ isEmployeeCreated, setIsEmployeeCreated }}
                >
                  <AllEmployeesContext.Provider
                    value={{ allEmployees, setAllEmployees }}
                  >
                    <SidebarConetext.Provider
                      value={{ isSidebarOpen, setIsSidebarOpen }}
                    >
                      <NavbarHeadingContext.Provider
                        value={{ navHeading, setNavHeading }}
                      >
                        <LogoutContext.Provider value={{ logout, setLogout }}>
                          <ConfirmLogoutContext.Provider
                            value={{ confirmLogout, setConfirmLogout }}
                          >
                            <IsUserAdminContext.Provider
                              value={{ isUserAdmin, setIsUserAdmin }}
                            >
                              <EmployeeProfileContext.Provider
                                value={{
                                  isEmployeeProfileActive,
                                  setIsEmployeeProfileActive,
                                }}
                              >
                                {children}
                              </EmployeeProfileContext.Provider>
                            </IsUserAdminContext.Provider>
                          </ConfirmLogoutContext.Provider>
                        </LogoutContext.Provider>
                      </NavbarHeadingContext.Provider>
                    </SidebarConetext.Provider>
                  </AllEmployeesContext.Provider>
                </EmployeeCreatedPopupContext.Provider>
              </TaskAssignedContext.Provider>
            </SavedDetailsPopupContext.Provider>
          </DeleteConfirmationBoxContext.Provider>
        </DeleteEmployeeContext.Provider>
      </EmployeeToDeleteContext.Provider>
    </EmployeeDeletedPopupContext.Provider>
  );
};

export default AppContextProvider;
