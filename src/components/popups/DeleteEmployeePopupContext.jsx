import { useContext } from "react";
import { EmployeeDeletedPopupContext } from "../../context/EmployeeDeletedPopupContext";

const DeleteEmployeePopupContext = () => {
  const { isEmployeeDeleted, setIsEmployeeDeleted } = useContext(
    EmployeeDeletedPopupContext
  );

  return (
    <>
      <div
        className={`w-full max-w-[300px] px-5 absolute  left-1/2 -translate-x-1/2 transition-all ${
          isEmployeeDeleted ? "top-[74px]" : "top-0"
        }`}
      >
        <div className="relative w-full h-[35px]  bg-red-500 rounded-lg flex justify-center items-center gap-2 text-white font-bold">
          <div>EMPLOYEE DELETED</div>
          <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
            <img
              className="w-full h-full bg-white"
              src="/accepted.gif"
              alt="accepted"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteEmployeePopupContext;
