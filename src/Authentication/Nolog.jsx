import React from 'react'
import { Link } from 'react-router-dom'

const Nolog = () => {
  return (
    <div className='flex h-[70vh] w-[90%] mx-auto items-center'>
      <div className="head text-slate text-6xl font-bold text-center mt-16 tracking-tight shadow-md p-10 rounded-xl w-fit mx-auto">
        OOPS!! 😟
        <div className="sub text-2xl md:text-4xl md:w-[55%] mx-auto text-slate mt-10 font-bold tracking-normal text-center">
            You firstly need to login 🔎 before going to access the services 🌈
        </div>
        <Link to={"/sign-in"}><button className='bg-main px-6 py-3 rounded-md mt-10 text-sm text-slate'>
            Login
        </button></Link>
      </div>
    </div>
  )
}

export default Nolog
