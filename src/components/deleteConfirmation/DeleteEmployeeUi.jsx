import { useContext } from "react";
import { DeleteConfirmationBoxContext } from "../../context/DeleteConfirmationBoxContext";
import { DeleteEmployeeContext } from "../../context/DeleteEmployeeContext";
import { EmployeeToDeleteContext } from "../../context/EmployeeToDeleteContext";
import axios from "axios";
import { AllEmployeesContext } from "../../context/AllEmployeesContext";
import { EmployeeDeletedPopupContext } from "../../context/EmployeeDeletedPopupContext";
import apiUrl from "../../config";

const DeleteEmployeeUi = () => {
  const { deleteConfirmationBox, setDeleteConfirmationBox } = useContext(
    DeleteConfirmationBoxContext
  );
  const { deleteEmployee, setDeleteEmployee } = useContext(
    DeleteEmployeeContext
  );
  const { employeeToDelete, setEmployeeToDelete } = useContext(
    EmployeeToDeleteContext
  );
  const { allEmployees, setAllEmployees } = useContext(AllEmployeesContext);
  const { isEmployeeDeleted, setIsEmployeeDeleted } = useContext(
    EmployeeDeletedPopupContext
  );

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${apiUrl}/api/employees/employees/${employeeToDelete._id}`
      );
      const data = await res.data.message;
      allEmployeeData();
      setDeleteConfirmationBox(false);
      setEmployeeToDelete(null);
      deletePopup();
    } catch (err) {
      console.log(err);
      alert("Fail");
    }
  };

  // DELETE-POPUP
  const deletePopup = () => {
    setIsEmployeeDeleted(true);
    setTimeout(() => {
      setIsEmployeeDeleted(false);
    }, 2000);
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

  return (
    <div
      className={`w-full h-full fixed z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 flex justify-center items-center px-5 ${
        deleteConfirmationBox ? "scale-100" : "scale-0"
      }`}
    >
      <div className="w-full h-full max-w-[400px] max-h-[160px] rounded-sm bg-gray-700 flex flex-col justify-center items-center">
        <div className="text-lg font-bold text-red-400 max-sm:text-center">
          <span>You want to delete</span>{" "}
          <span>"{employeeToDelete?.name}"</span>
        </div>
        <div className="flex gap-6 mt-5">
          <button
            className=" px-3 py-[3px] bg-white text-black hover:bg-gray-300"
            onClick={() => {
              setDeleteConfirmationBox(false);
              setEmployeeToDelete(null);
            }}
          >
            Cancel
          </button>
          <button
            className="px-3 py-[3px] bg-red-500 text-white font-semibold hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeUi;
