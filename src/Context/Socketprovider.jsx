import React, { useState } from 'react'
import { Socketcontext } from './Socketcontext'

const Socketprovider = ({children}) => {

  const [socketRef,setSocketRef] = useState(null)

  return (
   <Socketcontext.Provider value={{socketRef,setSocketRef}}>
     {children}
   </Socketcontext.Provider>
  )
}

export default Socketprovider
