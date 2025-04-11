import React, { useEffect, useState } from 'react'
import { getAllNewApplication } from '../../../../services/operations/adminApi';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const statuses = {
    approved: 'text-green-600 bg-green-200 ring-green-600/20',
    rejected: 'text-gray-600 bg-red-200 ring-gray-500/10',
    pending: 'text-yellow-800 bg-yellow-200 ring-yellow-600/20',
}


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


const AllNewApplications = () => {

  const {token}=useSelector((state)=> state.auth);
  const [newApplicationData,setNewApplicationData]=useState([]);

    useEffect(()=>{
        const getAllNewApplicationFunction = async () => {
            //getting list of all faculties
            try {
              const res = await getAllNewApplication(token);
              console.log("printing the response",res);
              if(res.length!==0)
                  {
                    setNewApplicationData(res);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
          }
          getAllNewApplicationFunction();
        },[]);


  return (
    <div className='w-[1200px] ml-[-100px] rounded-lg shadow-lg py-8 px-8'>
        <h2 className='font-bold mb-4'>All New Applications</h2>


    {newApplicationData.length!==0 ? <div>
      {/* Table headers */}
      <div className="grid grid-cols-12 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-1">Application ID</div>
        <div className="col-span-1 ml-[20px]">Roll no</div>
        <div className="col-span-3 ml-[40px]">Name of the Student</div>
        <div className="col-span-2">Leave Nature</div>
        <div className="col-span-1 ml-3">Total days</div>
        <div className="col-span-2 ml-3">Submission Date</div>
        <div className="col-span-1 ml-3">status</div>
      </div>


      
      {/* Table data */}
      {newApplicationData.map((item,index) => (

    <Link to={`/dashboard/admin/all-new-applications/new-application-details/${item?.application_id}`}>
        <div key={index}>

          {item?.application_id && <div className="grid grid-cols-12 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-1">{item?.application_id}</div>
            <div className="col-span-1 ml-[10px]">{item?.roll_no}</div>
            <div className="col-span-3 ml-[30px]">{item?.name?.length > 40 ? `${item.name.slice(0, 40)}...` : item.name}</div>
            <div className="col-span-2 ml-[-10px]">{item?.l_nature?.length > 35 ? `${item.l_nature.slice(0, 35)}...` : item.l_nature}</div>
            <div className="col-span-1 ml-[10px]">{item?.no_of_days}</div>
            <div className="col-span-2 ml-[10px]">{item?.submission_date}</div>
            <div className="col-span-1"><p className={classNames(statuses[item?.status],
                                        'mt-0.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset',
                                        )}>{item?.status}</p></div>
          </div>}

        </div>
        </Link>
      ))}

      </div> : <div className='flex justify-center items-center text-gray-400 gap-2 pt-16 pb-10'>
                    <FaceFrownIcon className='h-8'></FaceFrownIcon>
                    <p className='font-bold text-2xl'>No New Application Found</p>
                </div>}



    </div>
  )
}

export default AllNewApplications