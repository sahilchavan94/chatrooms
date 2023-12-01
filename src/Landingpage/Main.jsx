import React from 'react'
// import mainsection from '../assets/mainsec.png'
import Lottie from 'lottie-react'
import main from '../assets/main.json'
import mainsec from '../assets/mainsec1.png'
const Main = () => {
    return (
        <>
            <div className='md:flex flex-col items-center w-[75%] mx-auto mt-8 mb-8'>
                <Lottie animationData={main} className='w-[80%] mr-16 md:w-[50%]' />
                <div className="para font-semibold text-text w-[90%] mx-auto text-center text-sm md:text-base">
                    <div className="sub-head text-4xl text-slate text-center font-bold mb-3">
                        Get connected to others in a click 👋
                    </div>
                    <div className='py-4'>
                        Experience a new era of online connections with RoomCrafters, where you have the power to create your virtual space and engage in meaningful 🚀 conversations with strangers who share your interests. Connect instantly, chat seamlessly. Your room, your rules 🌈 embark on a unique journey 🌍 of discovery and friendship with RoomCrafters. Join us today and shape your conversations in a space that's truly yours. 🌐🗣️✨ #RoomCrafters #ConnectChatCreate.
                    </div>
                </div>
            </div>
            <img className='mx-auto w-[22rem] md:w-[42rem] lg:w-[55rem]' src={mainsec} alt="" />
            <div className="footer my-5 text-text text-sm font-semibold text-center">
                Chatrooms&copy;2023 - All rights reserved
            </div>
        </>
    )
}

export default Main
