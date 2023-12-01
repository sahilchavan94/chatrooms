import React, { useContext, useEffect} from 'react'
import Enterroom from './Enterroom'
import { Authcontext } from '../Context/Authcontext'
import Nolog from '../Authentication/Nolog'
import { initSocket } from './Socket'
import { Socketcontext } from '../Context/Socketcontext'

const Joinroom = () => {

  const { token } = useContext(Authcontext)
  const {setSocketRef} = useContext(Socketcontext)

  useEffect(() => {
    const initConnection = async () => {
      setSocketRef(await initSocket())
    }
    initConnection()
  }, [setSocketRef])

  return (
    <div>
      {token ? <Enterroom/> : <Nolog />}
    </div>
  )
}

export default Joinroom
