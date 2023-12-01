import React, { useState } from 'react'
import { Authcontext } from './Authcontext'

const Authprovider = ({children}) => {

  const [token,setToken] = useState("")

  return (
   <Authcontext.Provider value={{token,setToken}}>
     {children}
   </Authcontext.Provider>
  )
}

export default Authprovider
