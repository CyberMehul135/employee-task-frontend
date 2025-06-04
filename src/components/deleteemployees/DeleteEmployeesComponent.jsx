import axios from "axios";
import PerformanceBar from "./PerformanceBar";
import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AllEmployeesContext } from "../../context/AllEmployeesContext";
import { DeleteConfirmationBoxContext } from "../../context/DeleteConfirmationBoxContext";
import { DeleteEmployeeContext } from "../../context/DeleteEmployeeContext";
import { EmployeeToDeleteContext } from "../../context/EmployeeToDeleteContext";
import apiUrl from "../../config";

const DeleteEmployeesComponent = () => {
  // CONTEXT
  const { allEmployees, setAllEmployees } = useContext(AllEmployeesContext);
  const { deleteConfirmationBox, setDeleteConfirmationBox } = useContext(
    DeleteConfirmationBoxContext
  );
  const { deleteEmployee, setDeleteEmployee } = useContext(
    DeleteEmployeeContext
  );
  const { employeeToDelete, setEmployeeToDelete } = useContext(
    EmployeeToDeleteContext
  );

  // STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployees);

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

  // DELETE EMPLOYEE
  const handleDeleteEmployee = (employee) => {
    setDeleteConfirmationBox(true);
    setEmployeeToDelete(employee);
  };

  // HANDLE EMPLOYEE SEARCH
  const handleEmployeeSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filter = allEmployees.filter((employee) =>
      employee.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmployees(filter);
  };

  useEffect(() => {
    setFilteredEmployees(allEmployees);
  }, [allEmployees]);

  return (
    <div className="w-full max-w-[1600px] mx-auto pt-[90px] h-full min-h-screen px-5 text-white ">
      {/* SEARCH */}
      <div className="w-full max-w-[1100px] mx-auto mt-3 px-5 flex justify-between items-center max-sm:px-0 max-sm:flex-col max-sm:mt-0">
        <h2 className="text-lg ml-5 font-bold tracking-widest max-sm:hidden">
          ALL EMPLOYEES
        </h2>
        <div className="flex gap-2 bg-gray-700 px-3 py-2 rounded-md w-full max-w-[300px]">
          <Search />
          <input
            type="text"
            placeholder="Search...."
            className="bg-gray-700 focus:outline-none focus:outline-offset-0 w-full"
            value={searchTerm}
            onChange={handleEmployeeSearch}
          />
        </div>
      </div>
      {/* HEADING */}
      <div className="w-full max-w-[1100px] mx-auto mt-3 px-5  flex flex-col gap-3 max-sm:hidden">
        <div className="py-3 px-5 bg-red-500 font-bold rounded-sm grid [grid-template-columns:20px_100px_120px_220px_80px_100px_100px_120px_auto] max-lg:[grid-template-columns:20px_80px_120px_210px_80px_50px_50px_65px_auto] text-center items-center max-lg:flex max-lg:justify-center transition-all">
          <span className="max-lg:hidden">No</span>
          <span className="max-lg:hidden">Employee</span>
          <span className="max-lg:hidden">Name</span>
          <span className="max-lg:hidden">Email</span>
          <span className="max-lg:hidden max-lg:-rotate-45">Password</span>
          <span className="max-lg:hidden max-lg:-rotate-45">Accepted</span>
          <span className="max-lg:hidden max-lg:-rotate-45">Completed</span>
          <span className="max-lg:hidden max-lg:-rotate-45">Performance</span>
          <span className="max-lg:hidden">Delete</span>
          <span className="hidden max-lg:block text-lg font-bold">
            Employees
          </span>
        </div>
      </div>
      {/* INDIVIDUAL EMPLOYEE */}
      <div className="w-full max-w-[1100px] h-[410px] max-lg:h-screen overflow-y-scroll mx-auto mt-5 px-5 pb-10  flex flex-col gap-3 max-sm:px-0 scrollbar-hidden">
        {filteredEmployees?.map((employee, i) => {
          return (
            <div
              className="py-3 px-5 mt-2 border border-blue-500 S rounded-lg grid [grid-template-columns:20px_100px_120px_220px_80px_100px_100px_120px_auto]  max-lg:grid-cols-1 text-center items-center hover:-translate-y-[2px] hover:bg-blue-700 hover:bg-opacity-60 transition-all"
              key={employee._id}
            >
              <span className="max-lg:hidden">{i + 1}.</span>
              <div className="w-[50px] h-[50px] max-lg:w-[100px] max-lg:h-[100px] rounded-full overflow-hidden mx-auto">
                <img
                  src={employee.profileImage}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              </div>
              <span>{employee.name}</span>
              <span>{employee.email}</span>
              <span>{employee.password}</span>
              <span className="max-lg:hidden">
                {employee.tasks.filter((task) => task.accepted === true).length}
              </span>
              <span className="max-lg:hidden">
                {
                  employee.tasks.filter((task) => task.completed === true)
                    .length
                }
              </span>
              <span>
                <PerformanceBar
                  percentage={(
                    (employee.tasks.filter((task) => task.completed === true)
                      .length *
                      100) /
                      employee.tasks.filter((task) => task.accepted === true)
                        .length || 0
                  ).toFixed(0)}
                />
              </span>
              <span>
                <button
                  className="bg-red-500 px-2 py-0.5 rounded-lg hover:bg-red-600 active:bg-red-800"
                  onClick={() => handleDeleteEmployee(employee)}
                >
                  Delete
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeleteEmployeesComponent;
