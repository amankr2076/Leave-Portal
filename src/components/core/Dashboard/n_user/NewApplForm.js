import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { generatePdfFileFunction } from '../../../../services/operations/studentAPI';
import { getLeaveNatureData } from '../../../../services/operations/studentAPI';

const NewApplForm = () => {


  const { token }= useSelector((state)=> state.auth);
  const [confirmation,setConfirmation]=useState(false);
  const [pdf_link,setPdfLink]=useState("");
  const [confirmation1,setConfirmation1]=useState(false);
  const [allLeaveNature,setAllLeaveNature]=useState([]);




  const [formdata, setFormdata] = useState({
    hostel_block: "",
    room_no: "",
    apply_leave_days: "",
    apply_leave_start_date:"",
    apply_leave_end_date:"",
    nature_of_leave:"",
    reason_of_leave:"",
    address_during_leave:"",
    mobile_no:"",
  })


  const { hostel_block,room_no,apply_leave_days,apply_leave_start_date,apply_leave_end_date,nature_of_leave,reason_of_leave,
    address_during_leave,mobile_no,} = formdata;



    const handleOnChange = (e) => {
      setFormdata((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }


    const calculateTotalDays = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // Calculate the difference in milliseconds
      const differenceInMs = end - start;
  
      // Convert milliseconds to days
      const totalDays = differenceInMs / (1000 * 60 * 60 * 24);
  
      return totalDays + 1; // Including both start and end dates
  }

    const isEndDateValid = (startDate, endDate) => {
      return new Date(endDate) >= new Date(startDate);
  };

    const handleOnSubmit = (e) => {
      e.preventDefault();

      if(hostel_block.trim() === "" || room_no.trim()==="" || apply_leave_days.trim()==="" || apply_leave_start_date.trim()==="" ||
          apply_leave_end_date.trim==="" || nature_of_leave.trim()==="" || reason_of_leave.trim()==="" || address_during_leave.trim()==="" ||
          mobile_no.trim()==="")
      {
          toast.error("Please enter All the details");
          return;
      }
      const [year1, month1, day1] = apply_leave_start_date.split('-');
      const [year2, month2, day2] = apply_leave_end_date.split('-');
      // console.log("printing the year",parseInt(year));
      if (parseInt(year1) < 2024 || parseInt(year1) > 2080 || parseInt(year2)<1950 || parseInt(year2)>2080) {
        toast.error("Enter a year between 2024 and 2080");
        return;
      }

      if (!isEndDateValid(apply_leave_start_date, apply_leave_end_date)) {
         toast.error("enter correct end_Date");
         return;
      }


      const totalDays = calculateTotalDays(apply_leave_start_date, apply_leave_end_date);

      if(totalDays!==parseInt(apply_leave_days))
      {
        toast.error("Date interval does match with Total days");
        return;
      }
      // toast.success(totalDays);
      setConfirmation(true);
     
    }

    console.log("printing the final form data", formdata);

    const finalSubmit= async ()=>{

      
      console.log("printing the final form data", formdata);

    
      const result=await generatePdfFileFunction(token,formdata);
      if(result)
      {
        setPdfLink(result);
        setConfirmation1(true);
      }
      setFormdata({hostel_block: "",room_no: "",apply_leave_days: "",apply_leave_start_date: "", apply_leave_end_date:"", 
        nature_of_leave: "", reason_of_leave: "", address_during_leave: "", mobile_no: ""});
  }

console.log("printing all the nature of leave",allLeaveNature);

  useEffect(()=>{
    
    const getLeaveNatureFunction = async () => {
      let res=[];
      try{

        res = await getLeaveNatureData(token);

        if(res.length!==0)
        {
          setAllLeaveNature(res);
        }
        else
        {
          setAllLeaveNature([]);
        }
      } catch(error) {
        console.log("could not fetch leave Nature data");
      }
  }
  getLeaveNatureFunction();
},[])




  return (
    <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
      <form onSubmit={handleOnSubmit}>
        <h2 className='font-bold'>Enter the details to apply for a Leave</h2>
        <div className="mt-16 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">



            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Hostel Block
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="hostel_block"
                      name="hostel_block"
                      type="text"
                      value={hostel_block}
                      placeholder="Enter block of your hostel"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Room no
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="room_no"
                      name="room_no"
                      type="text"
                      value={room_no}
                      placeholder="Enter your Room number"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Mobile number
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="mobile_no"
                      name="mobile_no"
                      type="number"
                      value={mobile_no}
                      placeholder="Enter your Mobile number"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter total days for leave
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="apply_leave_days"
                      name="apply_leave_days"
                      type="number"
                      value={apply_leave_days}
                      placeholder="Enter your Room number"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter leave start date
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="apply_leave_start_date"
                      name="apply_leave_start_date"
                      type="date"
                      value={apply_leave_start_date}
                      placeholder="Enter your Room number"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter leave end date
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="apply_leave_end_date"
                      name="apply_leave_end_date"
                      type="date"
                      value={apply_leave_end_date}
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter nature of leave
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      id="nature_of_leave"
                      name="nature_of_leave"
                      type="text"
                      value={nature_of_leave}
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {(allLeaveNature.length === 0) ?
                        (<option>No Leave Nature Available</option>) :
                        (
                           <>
                            <option value="">Select Nature of Leave</option>
                              {allLeaveNature.map((nature) => (
                              <option key={nature?.l_id} value={nature?.l_id}>
                              {nature?.l_nature}
                           </option>   
                         ))}
                          </>
                         )}
                    </select>
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Reason of leave
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="reason_of_leave"
                      name="reason_of_leave"
                      type="text"
                      value={reason_of_leave}
                      placeholder="Enter Reason of leave"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Address during leave
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="address_during_leave"
                      name="address_during_leave"
                      type="text"
                      value={address_during_leave}
                      placeholder="Enter Address during Leave"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


        </div>


        <div className="mt-10 flex items-center justify-end gap-x-6">
                <button
                type="submit"
                className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Proceed
            </button>
        </div>


      </form>



      {/* for confirmation of this form */}
      <Dialog open={confirmation} onClose={() => {}} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Confirmation
                        </DialogTitle>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are You Sure
                            <br></br>
                                A leave application will be generated based on the details filled
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={() => {setConfirmation(false); finalSubmit();}}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                        Generate PDF file
                    </button>
                    <button
                        type="button"
                        data-autofocus
                        onClick={() => {setConfirmation(false)}}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Cancel
                    </button>
                    </div>
                </DialogPanel>
                </div>
            </div>
            </Dialog>



      {/* for confirmation of this form */}
      <Dialog open={confirmation1} onClose={() => {}} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-200 sm:mx-0 sm:h-10 sm:w-10">
                        <CheckCircleIcon aria-hidden="true" className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Confirmation
                        </DialogTitle>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Pdf file generated Successfully     
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <a
                        href={pdf_link}
                        target='_blank'
                        onClick={() => {setConfirmation1(false);}}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                        Open pdf file
                    </a>
                    <button
                        type="button"
                        data-autofocus
                        onClick={() => {setConfirmation1(false)}}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Cancel
                    </button>
                    </div>
                </DialogPanel>
                </div>
            </div>
            </Dialog>
    </div>
  )
}

export default NewApplForm