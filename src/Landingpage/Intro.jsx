import React from 'react'
import { Link } from 'react-router-dom'


const Intro = () => {
    return (
        <div>
            <div className="head flex justify-center items-center mx-auto w-[90%] mt-8">
                <div className="headings text-3xl md:text-6xl mt-10 font-bold tracking-tight text-slate text-center mx-auto w-3/4">
                    <span className='text-main'>Chatrooms</span> - Spark Conversations, Build Connections 🌍 Where Strangers Become Friends 🌈 in Your Own Created Room! 🤞
                    <div className="buttons text-sm flex justify-center sm:text-xs md:text-sm font-semibold tracking-normal mt-8 text-slate text-center">
                        <Link to={"/room"}><button className='mr-2 bg-main w-36 md:w-52 md:px-7 py-4 rounded-md'>Start a chatroom</button></Link>
                        <Link to={"/sign-up"}><button className='bg-btn w-36 md:w-52 md:px-7 py-4 rounded-md'>Create an account</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro
