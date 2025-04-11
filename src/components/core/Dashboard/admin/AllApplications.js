import React, { useEffect, useState } from 'react'
import { getAllApplication } from '../../../../services/operations/adminApi';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const statuses = {
    approved: 'text-green-600 bg-green-200 ring-green-600/20',
    rejected: 'text-gray-600 bg-red-200 ring-gray-500/10',
    pending: 'text-yellow-800 bg-yellow-200 ring-yellow-600/20',
}


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


const AllApplications = () => {

  const filterData=[
    {
      id : 1,
      val : "All"
    },
    {
      id : 2,
      val : "pending"
    },
    {
      id : 3,
      val : "approved"
    },
    {
      id : 4,
      val : "rejected"
    }
  ]

  const { initialFilter } = useParams();
  const parsedFilter = parseInt(initialFilter, 10);
  const {token}=useSelector((state)=> state.auth);
  const [ApplicationData,setApplicationData]=useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filterOption, setFilterOption] = useState(Number(initialFilter) || 1);


  const handleOnChange=(e)=>{
    setFilterOption(Number(e.target.value));
  }

  console.log("printing the filter data",filterOption);

    // Sync with URL param changes
    useEffect(() => {
      setFilterOption(Number(initialFilter) || 1);
    }, [initialFilter]);


    useEffect(() => {
      if (filterOption === 1) {
        setFilteredApplications(ApplicationData); // All
      } else {
        const selectedStatus = filterData.find(item => item.id === parseInt(filterOption))?.val;
        const filtered = ApplicationData.filter(app => app.status === selectedStatus);
        setFilteredApplications(filtered);
      }
    }, [filterOption, ApplicationData]);
    

    useEffect(()=>{
        const getAllApplicationFunction = async () => {
            //getting list of all faculties
            try {
              const res = await getAllApplication(token);
              // console.log("printing the response",res);
              if(res.length!==0)
                  {
                    setApplicationData(res);
                  }
            } catch (error) {
              console.log("could not fetch project details.")
            }
          }
          getAllApplicationFunction();
        },[]);


  return (
    <div className='w-[1200px] ml-[-100px] rounded-lg shadow-lg py-8 px-8'>
      <div className='flex justify-between'>
          <h2 className='font-bold text-xl mb-4'>All Applications</h2>

          <div className='flex gap-3 mr-6'>
                  <label htmlFor="title" className="block font-bold leading-6 text-gray-500 mt-1">
                    Apply filter
                  </label>
                  <div className="">
                    <select
                      required
                      id="nature_of_leave"
                      name="nature_of_leave"
                      type="text"
                      value={filterOption}
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 px-7 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {(filterData.length === 0) ?
                        (<option>No filter data available</option>) :
                        (
                           <>
                              {filterData.map((data) => (
                              <option key={data?.id} value={data?.id}>
                              {data?.val}
                           </option>   
                         ))}
                          </>
                         )}
                    </select>
                  </div>
                </div>
      </div>
        


    {ApplicationData.length!==0 ? <div>
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
      {filteredApplications.map((item,index) => (

    <Link to={`/dashboard/admin/all-applications/all-application-details/${item?.application_id}`} key={index}>
        <div>

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

export default AllApplications