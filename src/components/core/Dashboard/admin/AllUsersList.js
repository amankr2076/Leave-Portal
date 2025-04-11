import React, { useEffect, useState } from 'react'
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { getAllUsersList } from '../../../../services/operations/adminApi';
import { useSelector } from 'react-redux';


const AllUsersList = () => {

  const {token}=useSelector((state)=> state.auth);
  const [allUersData,setAllUsersData]=useState([]);

    useEffect(()=>{
        const getAllUsersListFunction = async () => {
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
          getAllUsersListFunction();
        },[]);


  return (
    <div className='w-[1200px] ml-[-100px] rounded-lg shadow-lg py-8 px-8'>
        <h2 className='font-bold mb-4'>All Students</h2>


    {allUersData.length!==0 ? <div>
      {/* Table headers */}
      <div className="grid grid-cols-12 font-semibold border-b-2 pb-2 mt-6">
        <div className="col-span-1">User ID</div>
        <div className="col-span-1">Roll no</div>
        <div className="col-span-3 ml-[10px]">Name of the Student</div>
        <div className="col-span-1 ml-[-20px]">Department</div>
        <div className="col-span-1 ml-3">Hostel Block</div>
        <div className="col-span-1 ml-3">Room no</div>
        <div className="col-span-2 ml-8">Mobile No</div>
        <div className="col-span-1 ml-[-15px]">Email ID</div>
      </div>


      
      {/* Table data */}
      {allUersData.map((item,index) => (

        <div key={index}>

          {item?.u_id && <div className="grid grid-cols-12 gap-4 py-2 border-b hover: hover:bg-gray-100 transition duration-200 p-2 rounded">
            <div className="col-span-1">{item?.u_id}</div>
            <div className="col-span-1 ml-[-8px]">{item?.roll_no}</div>
            <div className="col-span-3 ml-[5px]">{item?.name?.length > 40 ? `${item?.name.slice(0, 40)}...` : item?.name}</div>
            <div className="col-span-1 ml-[-25px]">{item?.dept_name}</div>
            <div className="col-span-1 ml-[10px]">{item?.hostel_block}</div>
            <div className="col-span-1 ml-[10px]">{item?.room_number}</div>
            <div className="col-span-2 ml-[23px]">{item?.mobile_no}</div>
            <div className="col-span-2 ml-[-20px]">{item?.email}</div>
          </div>}

        </div>
      ))}

      </div> : <div className='flex justify-center items-center text-gray-400 gap-2 pt-16 pb-10'>
                    <FaceFrownIcon className='h-8'></FaceFrownIcon>
                    <p className='font-bold text-2xl'>No Users Found</p>
                </div>}



    </div>
  )
}

export default AllUsersList