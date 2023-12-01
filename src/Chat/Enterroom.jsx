import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../Context/Authcontext';
import Activerooms from './Activerooms';
import toast from 'react-hot-toast';

const Enterroom = () => {

    const { token } = useContext(Authcontext)
    const navigate = useNavigate("/")
    const [roomCategory, setRoomCategory] = useState("");
    const [rooms, setRooms] = useState([])

    const fetchAllaActiveRooms = async () => {
        axios.post("http://localhost:5000/api/room//fetchactiverooms").then((response) => {
            setRooms((response.data.rooms) || [])
        })
    }

    const enterRoom = async () => {
        if (!roomCategory || roomCategory.length < 2) {
            toast.error("Room theme is empty or one lettered")
            return
        } else {
            //adding new room to mongo
            axios.post("http://localhost:5000/api/room/addroom", { hostid: token, theme: roomCategory }).then((response) => {
                toast.success("New room added")
                navigate("/chatroom", { required: true, state: { theme: roomCategory, id: token } })
            }).catch(e => {
                alert(e.message)
                return
            })
        }
    }

    useEffect(() => {
        fetchAllaActiveRooms()
    }, [])

    return (
        <>
            <div className='mt-16'>
                <div className="back text-center">
                    <button className='bg-main text-slate text-sm px-4 py-2 rounded-md w-fit mx-auto font-semibold mt-10' onClick={() => navigate("/")}>Back to home</button>
                </div>
                <div className="heading text-3xl md:text-6xl font-bold text-slate text-center w-3/4 mx-auto mt-10">
                    Create a 🤞 new room to chat 💬 with other mates 👀
                </div>
                <div className="inputform mt-12 text-center p-10 shadow-md rounded-xl w-fit mx-auto">
                    <div className="username">
                        <label className='text-slate font-semibold'>Room category or room theme 😊 which you <br/> like to talk about 💬</label> <br />
                        <input type="text" value={roomCategory} onChange={(e) => { setRoomCategory(e.target.value) }} className='shadow-sm px-3 mt-5 py-2 rounded-md text-sm w-[90%] outline-none' placeholder='Enter the room category' />
                    </div>
                    <button className='bg-main px-5 py-3 rounded-3xl text-slate mx-auto mt-10 font-bold text-sm' onClick={enterRoom}>Create a room to chat ➡️</button>
                </div>
            </div>
            <Activerooms rooms={rooms} />
        </>
    )
}

export default Enterroom
