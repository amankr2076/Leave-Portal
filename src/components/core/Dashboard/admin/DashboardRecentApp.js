import React, { useEffect, useState } from 'react'
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


const DashboardRecentApp = ({allApplicationData}) => {

  const {token}=useSelector((state)=> state.auth);

  const filterdApplication = allApplicationData
  .filter(data => data.status === 'rejected' || data.status === 'approved')
  .slice(0, 5);


  return (
    <div className='w-[967px] ml-[-30px] py-8 px-8 mt-[-20px]'>

    {filterdApplication.length!==0 ? <div>
      {/* Table headers */}
      <div className="grid grid-cols-9 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-1">Application ID</div>
        <div className="col-span-1 ml-[20px]">Roll no</div>
        <div className="col-span-3 ml-[40px]">Name of the Student</div>
        <div className="col-span-1 ml-3">Total days</div>
        <div className="col-span-2 ml-3">Resolved Date</div>
        <div className="col-span-1 ml-3">status</div>
      </div>


      
      {/* Table data */}
      {filterdApplication.map((item,index) => (

    <Link to={`/dashboard/admin/all-applications/all-application-details/${item?.application_id}`}>
        <div key={index}>

          {item?.application_id && <div className="grid grid-cols-9 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-1">{item?.application_id}</div>
            <div className="col-span-1 ml-[10px]">{item?.roll_no}</div>
            <div className="col-span-3 ml-[30px]">{item?.name?.length > 40 ? `${item.name.slice(0, 40)}...` : item.name}</div>
            <div className="col-span-1 ml-[10px]">{item?.no_of_days}</div>
            <div className="col-span-2 ml-[10px]">{item?.resolved_date}</div>
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

export default DashboardRecentApp