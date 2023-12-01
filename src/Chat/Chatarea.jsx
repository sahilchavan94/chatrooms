import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Socketcontext } from '../Context/Socketcontext'
import { Authcontext } from '../Context/Authcontext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Chatarea = () => {

    const location = useLocation()
    const { token } = useContext(Authcontext)
    const { socketRef } = useContext(Socketcontext)
    const [you, setYou] = useState("")
    const navigate = useNavigate("/")

    //for messaging 
    const [msg, setMsg] = useState("")
    const [msgList, setMsgList] = useState([])


    useEffect(() => {
        fetch("http://localhost:5000/api/auth/get-user-data",
            {
                method: "POST",
                headers: {
                    "authtoken": token,
                    "Content-type": "application/json"
                }
            }
        ).then((response) => {
            const data = response.json()
            data.then((data) => {
                setYou(data.user.name)
            })
        }).catch((e) => {
            toast.error(e.message)
        })

        socketRef.emit('join-request', {
            id: location.state.id,
            theme: location.state.theme
        })

        socketRef.on('joined', ({ id }) => {
            toast.success("Someone joined the room")
        })

        socketRef.on('remove', () => {
            toast.success("Someone left the room")
        })

        socketRef.on('room-ended', () => {
            toast.success("Host ended room for everyone")
            navigate("/")
        })

        socketRef.on('receive-message', ({ token, msg, you }) => {
            setMsgList(prev => ([...prev, { token, msg, you }])) //updating message list on client side
        })

        return () => {
            if (token === location.state.id) {
                axios.post("http://localhost:5000/api/room/deleteroom", { id: location.state.id }).then(() => {
                    socketRef.emit("end-room", { id: token })
                    toast.success("Room discarded for everyone")
                    navigate("/")
                    socketRef.disconnect();
                }).catch(() => {
                    toast.error("Failed an operation")
                })
            }
            else {
                socketRef.disconnect();
            }
        }
    }, [socketRef, location.state.id, location.state.theme, navigate, token])

    return (
        <div className='mx-3'>
            <div className="heading text-2xl md:text-4xl text-slate text-center w-3/4 mx-auto mt-10 font-bold tracking-tight">
                Welcome to the <span className='text-main'>chatroom</span> of {location.state.theme} 💬 chat & connect 🤞 with strangers in the room and make friends 👋
            </div>
            <div className="chatarea mt-10 w-[90%] mx-auto h-[75vh] shadow-md rounded-md max-h-[36rem]">
                <div className="upperbar bg-main flex justify-start items-center gap-2 px-4 h-10 rounded-t-md">
                    <div className="bg-red w-3 h-3 rounded-full"></div>
                    <div className="bg-yellow w-3 h-3 rounded-full"></div>
                    <div className="bg-white w-3 h-3 rounded-full"></div>
                </div>
                <div className="chat-render h-[90%] w-[90%] overflow-x-hidden mx-auto overflow-y-scroll mt-5">
                    {msgList.map(msg => {
                        return (
                            <div className={`text-sm font-semibold w-full flex flex-col justify-center ${msg.token === token ? "items-end" : " items-start"}`}> <div className='mb-1 text-text'>{msg.you}</div><div className={`w-fit mb-2 px-6 py-2 ${msg.token === token ? "bg-main text-slate rounded-lg rounded-tr-none" : "bg-btn text-white rounded-lg rounded-tl-none"}`}>{msg.msg}</div></div>
                        )
                    })}
                </div>
            </div>
            <div className='flex justify-between gap-4 my-4 w-[90%] mx-auto'>
                <div className='flex justify-start gap-2 text-white text-sm'>
                    <button className='bg-red px-6 py-2 rounded-md' onClick={() => { navigate("/") }}>End</button>
                    <button className='bg-slate px-4 py-2 rounded-md'>Close </button>
                </div>
                <div className='flex justify-center items-center w-[80%]'>

                    <input value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setMsgList(prev => ([...prev, { token, msg, you }])) //updating message list on client side
                            socketRef.emit("sent-message", { token, msg, you })
                            setMsg("")
                        }
                    }} type="text" placeholder='Message to the room' className='px-4 py-2 rounded-md shadow-md w-[90%] outline-none mr-2' />

                    <button onClick={() => {
                        setMsgList(prev => ([...prev, { token, msg, you }])) //updating message list on client side
                        socketRef.emit("sent-message", { token, msg, you })
                        setMsg("")
                    }} className='bg-main text-slate text-sm font-semibold px-6 py-2 rounded-3xl'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chatarea