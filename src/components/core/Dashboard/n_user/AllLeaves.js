import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AllLeavesList from './AllLeavesList';

import { getAllLeavesOfUser } from '../../../../services/operations/studentAPI';

const AllLeaves = () => {
  const {token}=useSelector((state)=>state.auth);
  const { user } = useSelector((state) => state.profile);
  const [allLeaves,setAllLeaves]=useState([]);
  const userID=user?.u_id;

  useEffect(() => {
    const getAllLeavesFunction = async () => {
      try {
        const res = await getAllLeavesOfUser(token,userID);
        console.log(res);
        setAllLeaves(res);
      } catch (error) {
        console.log("Could not All Leaves list.");
      }
    }; 
    getAllLeavesFunction();
  }, [])
  return (
    <div>
        <div className='text-3xl font-bold text-gray-500 mb-12'>All Leaves</div>

        {allLeaves.length===0 && <div className='text-2xl font-bold flex justify-center'><p>No Projects Found</p></div>}
        {allLeaves.length>0 && <AllLeavesList allLeaves={allLeaves}></AllLeavesList>}
    </div>
  )
}

export default AllLeaves;