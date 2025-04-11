import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { changepassword } from "../../../../services/operations/ChangePassword";



export default function UserSetting() {

    const { token } = useSelector((state) => state.auth);
    const [confirmation,setConfirmation]=useState(false);

    //for password
    const [showCurrPassword, setShowCurrPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const [formdata, setFormdata] = useState({
        curr_pass: "",
        new_pass: "",
        conf_pass: "",
      })



      const { curr_pass, new_pass,conf_pass } = formdata;


      const handleOnChange = (e) => {
        setFormdata((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }


          // Handle Form Submission
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log("printing the form data",formdata);
  
        if(curr_pass.trim()==="" || new_pass.trim()==="" || conf_pass.trim()==="")
        {
          toast.error("enter all the details");
          return;
        }


        if(new_pass!==conf_pass)
        {
            toast.error("Password and confirm Password does not match");
            return;
        }
  
          setConfirmation(true);
      }




  return (
    <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
        <form onSubmit={handleOnSubmit}>
            <h2 className='font-bold'>Change Your password</h2>
            <div className="mt-16 grid grid-cols-1 gap-x-20 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                          <label htmlFor="curr_pass" className="block text-sm font-medium leading-6 text-gray-900">
                            Enter Your Current password
                          </label>
                          <div className="mt-2 flex relative">
                            <input
                              required
                              id="curr_pass"
                              name="curr_pass"
                              type={showCurrPassword ? "text" : "password"}
                              value={curr_pass}
                              placeholder="Enter Your Current password"
                              onChange={handleOnChange}
                              className="block w-full rounded-md pr-10 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <span
                            onClick={() => setShowCurrPassword((prev) => !prev)}
                            className="absolute right-3 top-[6px] z-[10] cursor-pointer"
                            >
                            {showCurrPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                            </span>
                          </div>

                        </div>


                        <div className="sm:col-span-3 sm:col-start-1">
                          <label htmlFor="new_pass" className="block text-sm font-medium leading-6 text-gray-900">
                            Enter New Password
                          </label>
                          <div className="mt-2 flex relative">
                            <input
                              required
                              id="new_pass"
                              name="new_pass"
                              type={showNewPassword ? "text" : "password"}
                              value={new_pass}
                              placeholder="Enter New password"
                              onChange={handleOnChange}
                              className="block w-full rounded-md pr-10 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <span
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute right-3 top-[6px] z-[10] cursor-pointer"
                                >
                                {showNewPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                          </div>
                        </div>



                        <div className="sm:col-span-3 sm:col-start-1">
                          <label htmlFor="conf_pass" className="block text-sm font-medium leading-6 text-gray-900">
                            Enter Confirm Password
                          </label>
                          <div className="mt-2 flex relative">
                            <input
                              required
                              id="conf_pass"
                              name="conf_pass"
                              type={showConfirmPassword ? "text" : "password"}
                              value={conf_pass}
                              placeholder="Confirm password"
                              onChange={handleOnChange}
                              className="block w-full rounded-md pr-10 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-[6px] z-[10] cursor-pointer"
                                >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                          </div>
                        </div>

            </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Change
                        </button>
                        </div>



        </form>


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
                                Your password will be updated
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={async () => {setConfirmation(false); await changepassword(token,formdata); setFormdata({curr_pass: "",new_pass: "",conf_pass: "",})}}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        data-autofocus
                        onClick={() => {setConfirmation(false);}}
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