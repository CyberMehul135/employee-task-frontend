import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/loginPanel/Login";
import EmployeesDashboard from "./pages/employeesPanel/EmployeesDashboard";
import CreateEmployees from "./pages/adminPanel/CreateEmployees";
import TaskAssign from "./pages/adminPanel/TaskAssign";
import AdminDashboard from "./pages/adminPanel/AdminDashboard";

// PROVIDER-CONTEXTS
import AppContextProvider from "./context/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employeesdashboard" element={<EmployeesDashboard />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/createemployees" element={<CreateEmployees />} />
          <Route path="/taskassign" element={<TaskAssign />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
