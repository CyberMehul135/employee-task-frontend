import { useContext } from "react";
import { EmployeeCreatedPopupContext } from "../../context/EmployeeCreatedPopupContext";

const CreateEmployeePopup = () => {
  const { isEmployeeCreated, setIsEmployeeCreated } = useContext(
    EmployeeCreatedPopupContext
  );
  return (
    <div
      className={`w-full max-w-[300px] px-5 fixed  left-1/2 -translate-x-1/2 transition-all ${
        isEmployeeCreated ? "top-[74px]" : "top-0"
      }`}
    >
      <div className="relative w-full h-[35px]  bg-green-500 rounded-lg flex justify-center items-center gap-2 text-white font-bold">
        <div>EMPLOYEE CREATED</div>
        <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
          <img
            className="w-full h-full bg-white"
            src="/accepted.gif"
            alt="accepted"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeePopup;
