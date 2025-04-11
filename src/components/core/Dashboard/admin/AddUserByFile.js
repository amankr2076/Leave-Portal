import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import upload_logo from "../../../../assets/upload_logo.png";
import file_icon from "../../../../assets/file_icon.png"
import { AddUserByFileFunction } from '../../../../services/operations/adminApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const AddUserByFile = () => {

    const { token }= useSelector((state)=> state.auth);
    const [confirmation,setConfirmation]=useState(false);
    const [fileName, setFileName] = useState("testFile.xlsx");
    const [file, setFile] = useState(null);


    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setFileName(uploadedFile ? uploadedFile.name : "");
      };


      const handleUpload = async () => {
        if (!file){
            toast.error("please choose a file");
            return;
        } 
        const formData = new FormData();
        formData.append("file", file);
        // upload logic here...
        await AddUserByFileFunction(token,formData);
        setFile(null);
      };

  return (
    <div className='flex flex-col gap-y-4 px-12 py-8 w-[900px] mx-auto overflow-hidden bg-white shadow-xl sm:rounded-lg'>
        
        <div className="border-2 border-dashed  border-gray-400 rounded-lg p-4 py-14">
        {!file && 
        <div className='flex flex-col justify-center items-center mt-[-30px]'
            onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
            onDrop={(e) => {
            e.preventDefault();
            const droppedFile = e.dataTransfer.files[0];
            // ✅ Validate file type
            const allowedTypes = [
                'text/csv',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
                'application/vnd.ms-excel', // Older Excel format
            ];

            if (!allowedTypes.includes(droppedFile.type)) {
                toast.error("Only CSV or Excel (.xlsx) files are allowed");
                return;
            }
            handleFileChange({ target: { files: [droppedFile] } }); // Reuse your file handler
            }}
        >
            <img src={upload_logo} alt='upload_image' className='h-32'></img>
            <p className='text-gray-500 font-semibold text-lg'>Drag and Drop file</p>
            <p className='text-gray-500 font-semibold text-lg'>or</p>
            <input
                type="file"
                accept=".csv, .xlsx"
                className='hidden'
                onChange={handleFileChange}
                id="fileInput"
                >
            </input>

            
            <div className='mt-3'>
                <label htmlFor="fileInput" className="rounded-md mt-2 cursor-pointer bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Select File
                </label>
            </div>

        </div>}


        {file && <div className='flex flex-col justify-center items-center'>
            {/* File name display */}
            <div className='flex mt-4'>
                <img src={file_icon} alt='file_image' className='h-10'></img>
                <span className="ml-1 mt-2 text-gray-700 font-bold">{fileName}</span>
            </div>


            <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                onClick={()=>{setFile(null)}}
                className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                change file
                </button>
                <button
                onClick={()=>{setConfirmation(true)}}
                className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Upload
                </button>
            </div>
        </div>}

        </div>

        <li className='text-gray-500'>.csv or .xlsx file supproted</li>
        <li className='text-gray-500 mt-[-10px]'>The file should have roll_no, name, dept_id, hostel_block, room_number, mobile_no, email attributes</li>
        <li className='text-gray-500 mt-[-10px]'>No duplicate user should be in the file</li>



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
                            onClick={() => {setConfirmation(false); handleUpload();}}
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

export default AddUserByFile