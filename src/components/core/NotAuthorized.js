import React from 'react'
import warning_image from '../../assets/warning_image.png'

const NotAuthorized = () => {
  return (

    <div className='flex flex-col items-center gap-[15px] mt-[200px]'>
        <img src={warning_image} alt='warning-image' className='h-[75px]'></img>
        <div className='font-semibold'>You are not authorized to access this page</div>
    </div>
  )
}

export default NotAuthorized