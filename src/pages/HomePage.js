import React from 'react'
import FirstComp from '../components/core/HomePage/FirstComp'
import SecondComp from '../components/core/HomePage/SecondComp'
import Footer from '../components/core/HomePage/Footer'

const Homepage = () => {
  return (
    <div className='m-0'>
        {/* <p className='font-bold text-2xl'>Welcome to Homepage</p> */}
    <FirstComp></FirstComp>
    <SecondComp></SecondComp>
    <Footer></Footer>
    </div>
  )
}

export default Homepage