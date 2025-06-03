import { CheckSquare, LayoutDashboardIcon, UserPlus } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarConetext } from "../../context/SidebarContext";

const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    color: "#3B82F6",
  },
  {
    title: "Create Employees",
    icon: UserPlus,
    href: "/createemployees",
    color: "#3B82F6",
  },
  {
    title: "Task Assign",
    icon: CheckSquare,
    href: "/taskassign",
    color: "#3B82F6",
  },
];

const Sidebar = () => {
  const { isSidebarOpen } = useContext(SidebarConetext);

  return (
    <div
      className={`absolute w-[270px] h-full top-0 z-10  bg-gray-800 border-r border-gray-700 px-3 py-8 transition-all duration-700 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-[300px]"
      }`}
    >
      <div className="mt-16">
        {SIDEBAR_ITEMS.map((item, i) => {
          return (
            <Link to={item.href} key={i}>
              <div className="flex items-center gap-5 p-4 rounded-lg hover:bg-gray-700 cursor-pointer">
                <item.icon style={{ color: item.color }} size={24} />
                <span className="text-lg">{item.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
