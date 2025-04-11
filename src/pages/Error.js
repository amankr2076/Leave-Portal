import React from 'react'
import { Link } from 'react-router-dom'
import { setOption } from '../slices/navslice'
import { useDispatch } from 'react-redux'

const Error = () => {
  
  const dispatch=useDispatch();

  return (
    <div className='flex flex-col items-center gap-[15px] mt-[200px]'>
        <div className='font-bold text-[80px]'>404</div>
        <div className='font-semibold'>Page Not Found</div>
        <Link to={"/"}>
        <div
          onClick={()=>{dispatch(setOption(0))}}
          className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          GO to Home Page
        </div>
        </Link>
    </div>
  )
}

export default Error