import React from 'react'
import { Link } from 'react-router-dom'

const StudentMainPage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
        <p className='font-bold'>Welcome to Dashboard of Student</p>
        <Link to={'/dashboard/student/main-page/new-application'}>
        <button className='font-semibold border-2 p-4 rounded-md border-black'>New Application</button>
        </Link>
    </div>
  )
}

export default StudentMainPage