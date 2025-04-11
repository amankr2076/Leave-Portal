import * as Icons from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { setOption } from "../../../slices/navslice"
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiDashboard2Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";


const icons = {
  IoSettingsOutline: IoSettingsOutline,
  CgProfile : CgProfile,
  RiDashboard2Line : RiDashboard2Line,
  IoIosAddCircleOutline : IoIosAddCircleOutline,
  MdOutlineManageAccounts : MdOutlineManageAccounts,
  FaRegFileAlt : FaRegFileAlt,
};


export default function SidebarLink({ link, iconName }) {
  // const Icon = Icons[iconName];
  const IconComponent= icons[iconName];
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile);

  const matchRoute = (route) => {
    return matchPath({ path: `${route}/*` }, location.pathname);
  }

  return (
    <NavLink
      onClick={()=>{(link.name==="Settings" ? dispatch(setOption(3)) : dispatch(setOption(2)));}}
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <div className="text-xl"><IconComponent /></div>
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}