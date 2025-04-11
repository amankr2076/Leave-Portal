import React from 'react'
// import image1 from '../../../assets/HomePageimage2.webp'
import image1 from '../../../assets/main-pic.png'

const FirstComp = () => {
  return (
    <div>
        <div className='h-dvh flex w-full'>
            <div className='w-3/5 h-dvh'>
                <div className='flex flex-col justify-center items-center h-full w-full -mt-20 gap-y-8 ml-[-30px]'>
                    <div>
                    <h1 className='text-5xl font-bold text-gray-500'>The Fast & Easy Way</h1>
                    <h1 className='text-5xl font-bold text-gray-500'>To Manage Your Leaves</h1>
                    </div>
                    <div className='ml-10 mt-4'>
                    <h1 className='text-2xl'>Welcome to the Leaves Management Portal of RGIPT</h1>
                    {/* <h1 className='text-2xl'></h1> */}
                    </div>
                </div>
            </div>

            <div className='w-2/5 mr-8'>
                <img
                    src={image1}
                    alt='image1'
                    className='w-full h-[350px] mt-40'></img>
            </div>
        </div>
    </div>
  )
}

export default FirstComp