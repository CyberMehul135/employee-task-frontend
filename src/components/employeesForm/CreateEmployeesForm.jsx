import axios from "axios";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import { useContext, useState } from "react";
import { EmployeeCreatedPopupContext } from "../../context/EmployeeCreatedPopupContext";
import apiUrl from "../../config";

const CreateEmployeesForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lock, setLock] = useState(false);
  const { isEmployeeCreated, setIsEmployeeCreated } = useContext(
    EmployeeCreatedPopupContext
  );

  const createEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/employees/employees/create`, {
        name,
        email,
        password,
      });
      if (res.data.employee) {
        setName("");
        setEmail("");
        setPassword("");
        employeeCreatedPopup();
      }
    } catch (err) {
      console.log(err);
      alert("Fail");
    }
  };

  // EMPLOYEE CREATION POPUP
  const employeeCreatedPopup = () => {
    setIsEmployeeCreated(true);
    setTimeout(() => {
      setIsEmployeeCreated(false);
    }, 2000);
  };

  return (
    <main className="w-full h-full max-w-[1600px] mx-auto px-5 pt-[120px] pb-10">
      <div className="text-xl font-semibold mx-auto max-w-[500px] text-center underline">
        QUICK CREATE
      </div>
      <form
        className="mt-8 max-w-[500px] mx-auto flex flex-col gap-8"
        onSubmit={createEmployee}
      >
        <div className="flex flex-col gap-2">
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
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className=" flex gap-3" htmlFor="email">
            <span>
              <Mail />
            </span>{" "}
            <span className="text-[17px]">Employee Email</span>
          </label>
          <input
            className="h-[35px] text-white px-9 rounded-sm bg-gray-800 focus:outline-blue-500 focus:outline-none focus:outline-offset-0"
            type="email"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className=" flex gap-3" htmlFor="password">
            <span>
              <Lock />
            </span>{" "}
            <span className="text-[17px]">Employee Password</span>
          </label>
          <div className="relative">
            <input
              className="h-[35px] w-full text-white px-9 rounded-sm bg-gray-800 focus:outline-blue-500 focus:outline-none focus:outline-offset-0"
              type={`${lock ? "text" : "password"}`}
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {lock ? (
              <EyeClosed
                className="absolute text-white top-1/2 -translate-y-1/2 right-5 cursor-pointer"
                onClick={() => setLock(false)}
              />
            ) : (
              <Eye
                className="absolute text-white top-1/2 -translate-y-1/2 right-5 cursor-pointer"
                onClick={() => setLock(true)}
              />
            )}
          </div>
        </div>
        <button className="bg-blue-500 py-1 rounded-sm active:bg-blue-800 transition-all duration-5000">
          CREATE
        </button>
      </form>
    </main>
  );
};

export default CreateEmployeesForm;
