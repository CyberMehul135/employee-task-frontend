import axios from "axios";
import { Calendar, FileText, Layers, Type, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AllEmployeesContext } from "../../context/AllEmployeesContext";
import { TaskAssignedContext } from "../../context/TaskAssignedContext";
import apiUrl from "../../config";

const TaskAssignForm = () => {
  const [name, setName] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [selectedEmployee, SetSelectedEmployee] = useState({});
  const { isTaskAssigned, setIsTaskAssigned } = useContext(TaskAssignedContext);

  const { allEmployees, setAllEmployees } = useContext(AllEmployeesContext);

  const selectEmployee = (e) => {
    const val = e.target.value;
    setName(val);
    setFiltered(
      allEmployees?.filter((item) =>
        item.name.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

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

  // CREATE EMPLOYEE-TASK
  const handleTaskAssign = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${apiUrl}/api/employees/employees/editasks`,
        {
          taskTitle,
          taskDescription,
          category,
          date,
          selectedEmployee,
        }
      );
      const data = await res.data;
      if (data.employee) {
        setName("");
        setTaskTitle("");
        setTaskDescription("");
        setCategory("");
        setDate("");
        taskAssignedPopup();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // TASK ASSIGNED-POPUP
  const taskAssignedPopup = () => {
    setIsTaskAssigned(true);
    setTimeout(() => {
      setIsTaskAssigned(false);
    }, 2000);
  };

  return (
    <main className="w-full h-screen min-h-screen max-[538px]:h-full max-[538]:min-h-screen  max-w-[1600px] px-5 pt-[70px] pb-5 mx-auto">
      <form
        className="mt-8 max-w-[500px] mx-auto flex flex-col gap-8"
        onSubmit={handleTaskAssign}
      >
        <div className="flex flex-col gap-2 relative">
          <label className=" flex gap-3" htmlFor="name">
            <span>
              <User />
            </span>{" "}
            <span className="text-[17px]">Employee Name</span>
          </label>
          <input
            className="h-[35px] text-white px-9 rounded-sm bg-gray-800 focus:outline-blue-500 focus:outline-none focus:outline-offset-0"
            type="text"
            placeholder="Enter Name"
            id="name"
            value={name}
            onChange={selectEmployee}
            required
          />
          {filtered.length > 0 && (
            <ul className="absolute z-10 w-full max-h-[150px] overflow-y-scroll bg-gray-800 border border-blue-500 mt-[73px] rounded-md shadow text-white">
              {filtered.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setName(item.name);
                    setFiltered([]);
                    SetSelectedEmployee(item._id);
                  }}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className=" flex gap-3" htmlFor="tasktitle">
            <span>
              <Type />
            </span>{" "}
            <span className="text-[17px]">Task Title</span>
          </label>
          <input
            className="h-[35px] text-white px-9 rounded-sm bg-gray-800 focus:outline-blue-500 focus:outline-none focus:outline-offset-0"
            type="text"
            placeholder="Enter Title"
            id="tasktitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2 w-full max-w-full max-[538px]:flex-col">
          <div className="flex flex-col gap-2 relative w-full">
            <label className=" flex gap-3" htmlFor="category">
              <span>
                <Layers />
              </span>{" "}
              <span className="text-[17px]">Category</span>
            </label>
            <input
              className="h-[35px] text-white px-9 rounded-sm bg-gray-800 focus:outline-blue-500 focus:outline-none focus:outline-offset-0"
              type="text"
              placeholder="Category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 relative w-full">
            <label className=" flex gap-3" htmlFor="date">
              <span>
                <Calendar />
              </span>{" "}
              <span className="text-[17px]">Date</span>
            </label>
            <input
              className="h-[35px] text-white px-9 rounded-sm bg-gray-800 focus:outline-blue-500 focus:outline-none focus:outline-offset-0"
              type="date"
              placeholder="DD/MM/YY"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className=" flex gap-3" htmlFor="taskdescription">
            <span>
              <FileText />
            </span>{" "}
            <span className="text-[17px]">Task Description</span>
          </label>
          <textarea
            className="py-2 text-white px-9 rounded-sm bg-gray-800 focus:outline-blue-500 focus:outline-none focus:outline-offset-0"
            type="text"
            rows="4"
            placeholder="Enter Description..."
            id="taskdescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="bg-blue-500 py-1 rounded-sm active:bg-blue-800 transition-all duration-5000">
          GIVE TASK
        </button>
      </form>
    </main>
  );
};

export default TaskAssignForm;
