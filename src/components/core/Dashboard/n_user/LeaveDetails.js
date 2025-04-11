import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { getLeaveDetail } from '../../../../services/operations/studentAPI';
import { rejectApplicationFunction } from '../../../../services/operations/adminApi';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const statuses = {
    approved: 'text-green-600 bg-green-200 ring-green-600/20',
    rejected: 'text-gray-600 bg-red-200 ring-gray-500/10',
    pending: 'text-yellow-800 bg-yellow-200 ring-yellow-600/20',
}

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

export default function LeaveDetails({choosenOption,setChoosenOption}) {

  const navigate=useNavigate();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [confirmation,setConfirmation]=useState(false);
    const [confirmation1,setConfirmation1]=useState(false);
    const [showOption,setShowOption]=useState(false);
    const { applicationID } = useParams();
    const userID=user.u_id;
    // console.log("printing the application number",applicationID);

    const [response, setResponse] = useState(null);

    // console.log("printing the leave details response",response);

        const finalSubmit= async ()=>{

          const res=await rejectApplicationFunction(token,applicationID);
          if(res)
          {
            setConfirmation1(true);
          }
      }

    useEffect(() => {
      const getLeaveDetailsFunction = async () => {
        try {
          const res = await getLeaveDetail(token, applicationID);
          if (res && res.length > 0) {
            setResponse(res[0]);
    
            // If you want to check status directly here:
            if (user?.role==='admin' && res[0].status === 'pending') {
              setShowOption(true);
            }
          }
        } catch (error) {
          console.log("Could not fetch project details.");
        }
      };
    
      getLeaveDetailsFunction();
    }, []);


  return (
    <div className='flex flex-col gap-y-4'>
    <div className="overflow-hidden bg-white drop-shadow-xl sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">{response?.l_nature}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"><span>Status :</span>
            <span className={classNames(statuses[response?.status],
                  'mt-0.5 ml-2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                )}
              >
                {response?.status}
            </span> 
        </p>
      </div>
      <div className="border-t border-gray-400">
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Application ID :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.application_id}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Total applied Days :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.no_of_days}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Leave Start Date :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.from_date}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Leave End Date :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.to_date}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Nature OF Leave :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.l_nature}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Reason of Leave :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.reason}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Address During Leave :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.address_during_leave}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Mobile No :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.mobile_no}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Total accepted days :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.accepted_days}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Accepted Start Date :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.accepted_from==='Invalid date' ? 'NULL' : response?.accepted_from}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Accepted End Date :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.accepted_to==='Invalid date' ? 'NULL' : response?.accepted_to}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Applied On :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.submission_date==='Invalid date' ? 'NULL' : response?.submission_date}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Resolved On :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{response?.resolved_date==='Invalid date' ? 'NULL' : response?.resolved_date}</dd>
          </div>
          
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments :</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                
              {response?.pdf_file ? (

                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">File</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                  <a href={response?.pdf_file}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                    View
                </a>
                  </div>
                </li>
                  ) : (<div className='border-none py-3 px-3'>No files</div>)}
              </ul>
            </dd>
          </div>

        </dl>

              {showOption && (
                <div className="mt-10 flex items-center justify-center gap-x-6 mb-10">
                  <button
                    type="button"
                    disabled={choosenOption}
                    className={`rounded-md px-6 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                      ${choosenOption ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-400'}`}
                    onClick={() => {if(user?.role==='admin'){setConfirmation(true)}}}
                  >
                    Reject Application
                  </button>

                  <button
                    onClick={() => {if(setChoosenOption){setChoosenOption(true)}}}
                    className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Accept Application
                  </button>
                </div>
              )}
      </div>
    </div>
    




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
                                This Application will be Marked as rejected
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={async() => {setConfirmation(false); finalSubmit();}}
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
                                Application rejected
                            <br></br>
                                And a rejection email has been sent to the registered email of student.
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
                        close
                    </button>
                    </div>
                </DialogPanel>
                </div>
            </div>
            </Dialog>

    </div>
  )
}


