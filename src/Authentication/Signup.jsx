import { useState,useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Authcontext } from '../Context/Authcontext'

const Signup = () => {

    const navigate = useNavigate("/")
    const {setToken} = useContext(Authcontext)


    const [userData, setuserData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const signUp = async () => {
        if (!userData.name || !userData.email || !userData.password) {
            alert("Credentials are missinf")
            return;
        }

        const reqBody = {
            name: userData.name,
            email: userData.email,
            password: userData.password
        }

        axios.post("http://localhost:5000/api/auth/create-new-account", reqBody).then((response) => {
            alert("Account created successfully");
            //setting auth token in localstorage
            localStorage.setItem("token",response.data.authtoken)
            setToken(response.data.authtoken)
            navigate("/")
        }).catch((e) => {
            alert(e.message)
        })
    }

    const validateUserData = () => {
        const inputs = document.getElementsByTagName("input")
        Array.from(inputs).forEach((input) => {
            if (!input.value) {
                input.style.backgroundColor = '#f8d7da'
            }
            else {
                input.style.backgroundColor = '#d1e7dd'
            }
        })
    }


    return (
        <div>
            <div className='h-[90vh]  flex flex-col justify-center overflow-auto'>
                <button className='bg-main text-slate text-sm px-4 py-2 rounded-md w-fit mx-auto font-semibold' onClick={()=>navigate("/")}>Back to home</button>
                <div className="head text-2xl font-bold text-slate text-center mx-4 mt-5">
                    Create a new <span className='text-main'>Chatrooms</span> account 💬
                </div>

                <div onChange={validateUserData} className="flex flex-col justify-center items-center gap-4 mt-5 shadow-md md:w-[42%] w-[90%] mx-auto py-14 rounded-md">
                    <div className="username">
                        <label className='text-slate'>Username</label> <br />
                        <input type="text" onChange={(e) => { setuserData({ ...userData, name: e.target.value }) }} className='shadow-sm px-2 py-2 rounded-md text-sm w-96 outline-none' placeholder='Username' />
                    </div>
                    <div className="usermail">
                        <label className='text-slate'>Email</label><br />
                        <input type="email" onChange={(e) => { setuserData({ ...userData, email: e.target.value }) }} className='shadow-sm px-2 py-2 rounded-md  text-sm w-96 outline-none' placeholder='Email' />
                    </div>
                    <div className="userpasssword">
                        <label className='text-slate'>Password</label><br />
                        <input type="password" onChange={(e) => { setuserData({ ...userData, password: e.target.value }) }} className='shadow-sm px-2 py-2 rounded-md text-sm w-96 outline-none' placeholder='Password' />
                    </div>
                    <button onClick={signUp} className='bg-main text-white py-3 rounded-3xl w-[60%] md:w-96 mt-4 font-semibold'>Create account</button>
                </div>

                <div className="go-to-signin text-sm text-slate text-center mt-5">
                    Already have an account ?<Link to={"/sign-in"}> <span className='text-main hover:underline'>Sign in</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
