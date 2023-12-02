import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [token,setToken] = useState("")
  useEffect(()=>{
     setToken(localStorage.getItem('token'))
  },[])

  return (
    <div className='flex justify-between sm:w-[94.6%] md:[68%] mx-auto mt-4 px-5'>
      <div className="mainname text-main font-semibold text-2xl">
        Chat<span className='text-slate'>rooms</span><span>🤞</span>
      </div>
      <div className="otherpages flex gap-4 text-sm justify-start items-center text-slate font-semibold">
        {!token && <Link to={"/sign-in"}><button className='bg-main rounded-md px-3 py-1'>Login</button></Link>}
        <Link to={!token && "/sign-up"}><button onClick={()=>{if(token){localStorage.setItem("token","");toast.success
      ("successfully logged out");window.location.reload()}}} className='border border-main px-3 py-1 rounded-md'>{token ? "Logout" : "Signup"}</button></Link>
      </div>
    </div>
  )
}

export default Navbar
