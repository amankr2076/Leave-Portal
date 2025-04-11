import React, { useEffect, useState } from 'react';
// import RecentProjects from './RecentProjects';
import { Link } from 'react-router-dom';
import { getAllApplication } from '../../../../services/operations/adminApi';
import { getAllUsersList } from '../../../../services/operations/adminApi';
import { useSelector } from 'react-redux';
import accept_logo from "../../../../assets/accepted_application_logo.png"
import reject_logo from "../../../../assets/rejected_application_logo.png"
import application_logo from "../../../../assets/application.png"
import DashboardRecentApp from './DashboardRecentApp';

const DashboardMainPage = () => {

  const {token}=useSelector((state)=> state.auth);
  const [allApplicationData,setAllApplicationData]=useState([]);
  const [allUsersData,setAllUsersData]=useState([]);



const pendingCount = allApplicationData?.length ? allApplicationData.filter(app => app.status === "pending").length : "";
const rejectedCount = allApplicationData?.length ? allApplicationData.filter(app => app.status === "rejected").length : "";
const approvedCount = allApplicationData?.length ? allApplicationData.filter(app => app.status === "approved").length : "";
const total_applications = allApplicationData?.length ? allApplicationData?.length +1 : "";


  const pendingCountPer=(pendingCount/total_applications)*100 || 0;
  const rejectedCountPer=(rejectedCount/total_applications)*100 || 0;
  const approvedCountPer=(approvedCount/total_applications)*100 || 0;
  // console.log("printing the %",active_c_Project);


    useEffect(()=>{
        const getAllApplicationDetails = async () => {
            //getting list of all faculties
            try {
              const res = await getAllApplication(token);
              console.log("printing the response",res);
              if(res.length!==0)
                  {
                    setAllApplicationData(res);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
          }
        const getAllUsersData = async () => {
            //getting list of all faculties
            try {
              const res = await getAllUsersList(token);
              console.log("printing the response",res);
              if(res.length!==0)
                  {
                    setAllUsersData(res);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
          }
          getAllApplicationDetails();
          getAllUsersData();
        },[]);
  return (
  <div className='flex flex-col w-full'>
    <div className="h-[550px] bg-white flex justify-center">
      <div className="w-full max-w-5xl p-4 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        
        {/* Top Cards */}
        <div className="col-span-1 lg:col-span-3 grid gap-4 grid-cols-3 w-[967px]">
          <Link to={"/dashboard/admin/all-new-applications"}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center h-52 flex flex-col justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
              <img src={application_logo} alt='application_logo' className='h-[40px]'></img>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-gray-500">New Applications</p>
            </div>
          </Link>

          <Link to={"/dashboard/admin/all-users-list"}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center h-52 flex flex-col justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
              <div className="text-4xl mb-2">👤</div>
              <p className="text-2xl font-bold">{allUsersData?.length}</p>
              <p className="text-gray-500">Users</p>
            </div>
          </Link>

          <Link to={"/dashboard/admin/all-applications"}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center h-52 flex flex-col justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
              <img src={application_logo} alt='r' className='h-[40px]'></img>
              <p className="text-2xl font-bold">{total_applications}</p>
              <p className="text-gray-500">Total Applications</p>
            </div>
          </Link>
        </div>

        {/* Smaller Action Cards */}
        <div className="col-span-1 md:col-span-3 lg:col-span-3 grid gap-4 grid-cols-1 w-[550px]">
          <Link to={"/dashboard/admin/all-applications/3"} className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
            <div className='flex'>
                <img src={accept_logo} alt='r' className='h-[50px]'></img>
                <p className='font-bold text-gray-500 mt-2 text-xl'>Accepted Applications</p>
            </div>
          </Link>
          
          <Link to={"/dashboard/admin/all-applications/4"} className="bg-white p-4 rounded-lg shadow-lg text-center flex justify-center items-center hover: hover:bg-gray-200 transition duration-200 cursor-pointer">
            <div className='flex gap-2'>
                <img src={reject_logo} alt='r' className='h-[45px]'></img>
                <p className='font-bold text-gray-500 mt-2 text-xl'>Rejected Applications</p>
            </div>
          </Link>

        </div>

        {/* OS Usage Statistics */}
        <div className="bg-white p-4 rounded-lg shadow-lg col-span-1 ml-[-180px] flex flex-col gap-6">
          <h3 className="text-xl font-semibold mb-4">Stats Of Applications</h3>
          <div className='mt-[-20px]'>
            <p className="text-gray-600">Approved Applications</p>
            <div className="bg-gray-200 h-2 rounded-full mt-1">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${approvedCountPer}%` }}></div>
            </div>
          </div>
          <div>
            <p className="text-gray-600">Rejected Applications</p>
            <div className="bg-gray-200 h-2 rounded-full mt-1">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: `${rejectedCountPer}%` }}></div>
            </div>
          </div>
          <div>
            <p className="text-gray-600">Pending Applications</p>
            <div className="bg-gray-200 h-2 rounded-full mt-1">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${pendingCountPer}%` }}></div>
            </div>
          </div>
          {/* <div className="mb-2">
            <p className="text-gray-600">iPhone</p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>

    <div className='w-[967px] ml-4 rounded-lg shadow-lg py-8 px-8'>
        <h2 className='font-bold text-lg'>Recently resolved Applications</h2>
        <DashboardRecentApp allApplicationData={allApplicationData}></DashboardRecentApp>
    </div>
  </div>  
  );
};

export default DashboardMainPage;
