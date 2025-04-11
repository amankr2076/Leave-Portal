import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../../services/operations/authApi';
import profileImage from "../../assets/profile.webp"
import logo from "../../assets/college_logo.png"
import LogoutConfirmationModal from './LogoutConfirmationModal';
import { setOption } from '../../slices/navslice';


export default function Navbar() {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);
    const { user } = useSelector((state) => state.profile);
    const { option } =useSelector((state)=>state.nav); 
    const [confirmationModal, setConfirmationModal] = useState(false)
    // const [options,setOptions]=useState(0);

    console.log("printing the option",option);

  return (
    <div>
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[56px] justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              
              <Link to="/">
              <img
                onClick={()=>{dispatch(setOption(0))}}
                alt="Your Company"
                src={logo}
                className="h-14 w-16"
              />
              </Link>
            </div>
            <div className="ml-6 flex space-x-8">
              {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}

              <Link to={"/"}
                    onClick={()=>{dispatch(setOption(1))}}
                    className={option===1 ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}>
                  <div>
                      Home
                  </div>
              </Link>
              <Link to={user?.role==="admin" ? "/dashboard/my-profile" : "/dashboard/my-profile"}
                    onClick={()=>{dispatch(setOption(2))}}
                    className={option===2 ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}>
                  <div>
                      Dashboard
                  </div>
              </Link>
              <Link to={user?.role==="admin" ? "/dashboard/admin/admin-setting" : "/dashboard/student/user-settings"}
                    onClick={()=>{dispatch(setOption(3))}}
                    className={option===3 ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}>
                  <div>
                      Settings
                  </div>
              </Link>


            </div>
          </div>
          <div className="flex items-center gap-x-2">
            {token===null && (
            <Link to="/login">
                <div className="flex-shrink-0">
                <button
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Login
                </button>
                </div>
            </Link>
            )}

            
            {token!==null && (<div className="ml-4 flex-shrink-0 flex items-center gap-6">
              {/* <button
                type="button"
                className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button> */}

              {token && user && <p>{user?.name}</p>}


              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="User"
                    src={profileImage}
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
                <MenuItems
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem>
                    <Link to={user?.role==="admin" ? "/dashboard/my-profile" : "/dashboard/my-profile"}>
                    <div  onClick={()=>{dispatch(setOption(2))}}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      dashboard
                    </div>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={user?.role==="admin" ? "/dashboard/admin/admin-setting" : "/dashboard/student/user-settings"}>
                      <div onClick={()=>{dispatch(setOption(3))}}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() =>setConfirmationModal(true)}>
                      Sign out
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>)}
          </div>
        </div>
      </div>
      {confirmationModal && <LogoutConfirmationModal confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} />}
    </nav>
    </div>
  );
}
