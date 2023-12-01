import { useContext } from "react"
import { Authcontext } from "../Context/Authcontext"
import { useNavigate } from "react-router-dom"
const Activerooms = ({ rooms }) => {

  const { token } = useContext(Authcontext)
  const navigate = useNavigate("/")
  const joinRoom = (id, theme) => {
    navigate("/chatroom", { required: true, state: { theme: theme, id: id } })
  }

  return (
    <>
      <div className="head text-3xl md:text-4xl text-text capitalize font-bold mt-16 text-center">
        Other active rooms ➡️🌍
      </div>
      <div className='flex justify-center items-center gap-4 flex-wrap my-10 w-3/4 mx-auto'>
        {rooms.map((room) => {
          if (room.hostid !== token) return <div className='px-14 py-10 rounded-xl shadow-md text-center bg-bgbox'>
            <div className='heading-theme text-2xl text-slate capitalize font-semibold'>Theme/category : <span className='text-main'>{room.theme}</span></div>
            <button className='text-white text-sm mt-6 px-5 py-3 rounded-md mx-auto bg-main font-bold' onClick={()=>joinRoom(room.hostid,room.theme)}>Join this room +</button>
          </div>
          return ""
        })}
      </div>
    </>
  )
}

export default Activerooms  
