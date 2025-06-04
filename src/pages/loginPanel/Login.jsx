import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../config";
import DotLoader from "../../components/Loader/DotLoader";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, {
        userEmail,
        userPassword,
      });

      setIsLoading(false);
      // setWrongCredentials(false);
      if (res.data?.employee?.type === "Employee") {
        navigate("/employeesdashboard");
        localStorage.setItem("data", JSON.stringify(res.data.employee.email));
      } else {
        navigate("/dashboard");
        localStorage.setItem("data", JSON.stringify(res.data.admin.email));
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setWrongCredentials(true);
    }
  };

  return (
    <div className="text-white h-screen w-full inset-0 bg-gray-900">
      <div className="w-full h-screen flex justify-center items-center px-5 max-w-[1600px] mx-auto">
        <form
          onSubmit={login}
          className="z-10 w-full max-w-[350px] h-[370px] border border-gray-700 rounded-xl bg-gray-800 backdrop-blur-md bg-opacity-50 p-10 flex flex-col gap-5 shadow-md"
        >
          <div className="flex flex-col gap-1">
            <label className="text-[17px]  ml-1" htmlFor="email">
              Email
            </label>
            <input
              className="px-2 h-9 text-white bg-gray-700 rounded-[4px] focus:outline-blue-500 focus:outline-none focus:outline-offset-0"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-[17px]  ml-1" htmlFor="password">
              Password
            </label>
            <input
              className="px-2 h-9 text-white bg-gray-700 rounded-[4px]  focus:outline-blue-500 focus:outline-none focus:outline-offset-0"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              name="password"
              required
            />
          </div>

          <Button variant="contained" color="info" type="submit">
            {isLoading ? <DotLoader /> : "Login"}
          </Button>

          {wrongCredentials ? (
            <div className="w-full text-white text-[15px] border border-red-500  flex justify-center rounded-md py-[6px] bg-red-500 bg-opacity-10 absolute -top-[45px] left-0">
              Wrong Credentials
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
