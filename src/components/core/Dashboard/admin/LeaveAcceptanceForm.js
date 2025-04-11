import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { acceptApplicationFunction } from '../../../../services/operations/adminApi';
import { useNavigate } from 'react-router-dom';

const LeaveAcceptanceForm = ({setChoosenOption, applicationID}) => {


  const { token }= useSelector((state)=> state.auth);
  const [confirmation,setConfirmation]=useState(false);
  const [confirmation1,setConfirmation1]=useState(false);
  const navigate=useNavigate();




  const [formData, setFormdata] = useState({
    accepted_leave_days: "",
    accepted_start_date:"",
    accepted_end_date:"",
  })


  const { accepted_leave_days,accepted_start_date,accepted_end_date} = formData;



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

      if(accepted_leave_days.trim() === "" || accepted_start_date.trim()==="" || accepted_end_date.trim()==="")
      {
          toast.error("Please enter All the details");
          return;
      }
      const [year1, month1, day1] = accepted_start_date.split('-');
      const [year2, month2, day2] = accepted_end_date.split('-');
      // console.log("printing the year",parseInt(year));
      if (parseInt(year1) < 2024 || parseInt(year1) > 2080 || parseInt(year2)<1950 || parseInt(year2)>2080) {
        toast.error("Enter a year between 2024 and 2080");
        return;
      }

      if (!isEndDateValid(accepted_start_date, accepted_end_date)) {
         toast.error("enter correct end_Date");
         return;
      }


      const totalDays = calculateTotalDays(accepted_start_date, accepted_end_date);

      if(totalDays!==parseInt(accepted_leave_days))
      {
        toast.error("Date interval does match with Total days");
        return;
      }
    //   toast.success(totalDays);
      setConfirmation(true);
     
    }

    console.log("printing the final form data", formData);

    const finalSubmit= async ()=>{

      
      console.log("printing the final form data", formData);

    
      const res=await acceptApplicationFunction(token,formData,applicationID);

      if(res)
      {
        setConfirmation1(true);
      }
    //   setFormdata({hostel_block: "",room_no: "",apply_leave_days: "",apply_leave_start_date: "", apply_leave_end_date:"", 
    //     nature_of_leave: "", reason_of_leave: "", address_during_leave: "", mobile_no: ""});
  }


  return (
    <div className='flex flex-col gap-y-4 px-12 py-8  mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
      <form onSubmit={handleOnSubmit}>
        <h2 className='font-bold'>Enter the Leave Acceptance Details</h2>
        <div className="mt-16 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">



            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter total days for which leave is accepted
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="accepted_leave_days"
                      name="accepted_leave_days"
                      type="number"
                      value={accepted_leave_days}
                      placeholder="Enter total days"
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
                      id="accepted_start_date"
                      name="accepted_start_date"
                      type="date"
                      value={accepted_start_date}
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
                      id="accepted_end_date"
                      name="accepted_end_date"
                      type="date"
                      value={accepted_end_date}
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


        </div>


                <div className="mt-10 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>{setChoosenOption(false)}}>
                    Cancel
                    </button>
                    <button
                    className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Accept
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
                                This Application will be Marked as accepted
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
                        Confirm
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
                                Leave Application Accepted
                            <br></br>
                                An accepteance mail has been sent to the registered email id of student
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={() => {setConfirmation1(false); navigate("/dashboard/admin/all-new-applications");}}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                        Close
                    </button>

                    </div>
                </DialogPanel>
                </div>
            </div>
            </Dialog>
    </div>
  )
}

export default LeaveAcceptanceForm