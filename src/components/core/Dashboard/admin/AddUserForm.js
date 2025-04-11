import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { getAllDepartments } from '../../../../services/operations/adminApi'
import { addUserFunction } from '../../../../services/operations/adminApi'
import toast from 'react-hot-toast';

const AddUserForm = () => {


  const { token }= useSelector((state)=> state.auth);
  const [confirmation,setConfirmation]=useState(false);
  const [departmentData,setAllDepartmentData]=useState([]);




  const [formdata, setFormdata] = useState({
    roll_no: "",
    name: "",
    dept_id: "",
    hostel_block:"",
    room_number:"",
    mobile_no:"",
    email:"",
  })


  const { roll_no,name,dept_id,hostel_block,room_number,mobile_no,email} = formdata;



    const handleOnChange = (e) => {
      setFormdata((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }


    const handleOnSubmit = (e) => {
      e.preventDefault();

      if(roll_no.trim() === "" || name.trim()==="" || dept_id.trim()==="" || hostel_block.trim()==="" ||
        room_number.trim==="" || mobile_no.trim()==="" || email.trim()==="")
      {
          toast.error("Please enter All the details");
          return;
      }
      setConfirmation(true);  
    }

    console.log("printing the final form data", formdata);

    const finalSubmit= async ()=>{

      console.log("printing the final form data", formdata);

      await addUserFunction(token,formdata);
      setFormdata({roll_no: "",name: "",dept_id: "",hostel_block: "", room_number:"", 
        mobile_no: "", email: ""});
  }

console.log("printing all the department data",departmentData);

  useEffect(()=>{
    
    const getDepartmentData = async () => {
      let res=[];
      try{

        res = await getAllDepartments(token);

        if(res.length!==0)
        {
          setAllDepartmentData(res);
        }
        else
        {
          setAllDepartmentData([]);
        }
      } catch(error) {
        console.log("could not fetch leave Nature data");
      }
  }
  getDepartmentData();
},[])




  return (
    <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
      <form onSubmit={handleOnSubmit}>
        <h2 className='font-bold'>Enter the details of student to add</h2>
        <div className="mt-16 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">



            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Roll no
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="roll_no"
                      name="roll_no"
                      type="text"
                      value={roll_no}
                      placeholder="Enter roll no"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      placeholder="Enter Name of student"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter department
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      id="dept_id"
                      name="dept_id"
                      type="text"
                      value={dept_id}
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {(departmentData.length === 0) ?
                        (<option>No department available</option>) :
                        (
                           <>
                            <option value="">Select Department</option>
                              {departmentData.map((dept) => (
                              <option key={dept?.dept_id} value={dept?.dept_id}>
                              {dept?.dept_name}
                           </option>
                         ))}
                          </>
                         )}
                    </select>
                  </div>
                </div>

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
                      placeholder="Enter Hostel block of student"
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
                      id="room_number"
                      name="room_number"
                      type="text"
                      value={room_number}
                      placeholder="Enter Room number of student"
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Mobile no
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="mobile_no"
                      name="mobile_no"
                      type="number"
                      value={mobile_no}
                      placeholder='Enter Mobile no of student'
                      onChange={handleOnChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            
            <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Email ID
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      placeholder="Enter Email id of student"
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
                Add
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
                                User will be added
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
    </div>
  )
}

export default AddUserForm