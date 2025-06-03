import { useContext } from "react";
import { TaskAssignedContext } from "../../context/TaskAssignedContext";

const TaskAssignedPopup = () => {
  const { isTaskAssigned, setIsTaskAssigned } = useContext(TaskAssignedContext);
  return (
    <div
      className={`w-full max-w-[300px] px-5 absolute  left-1/2 -translate-x-1/2 transition-all ${
        isTaskAssigned ? "top-[12%]" : "top-0"
      }`}
    >
      <div className="relative w-full h-[35px]  bg-blue-500 rounded-lg flex justify-center items-center gap-2 text-white font-bold">
        <div>TASK ASSIGNED</div>
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

export default TaskAssignedPopup;
