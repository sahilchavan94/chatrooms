import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import Home from "./Landingpage/Home";
import Joinroom from "./Chat/Joinroom";
import { useContext,useEffect } from "react";
import { Authcontext } from "./Context/Authcontext";
import Chatarea from "./Chat/Chatarea";
import { Toaster } from "react-hot-toast";

import {
  BrowserRouter as Router,
  Routes,Route
} from 'react-router-dom'


function App() {

  const {token, setToken} = useContext(Authcontext)

  useEffect(() => {
      setToken(localStorage.getItem('token'))
  }, [token,setToken])

 
  return (
    <>
     <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                color: "#57534e",
                fontWeight:600
              },
              iconTheme: {
                primary: '#4ade80',
              },
            },

            error: {
              style: {
                color: "#57534e",
                fontWeight:600
              },
              iconTheme: {
                primary: '#4ade80',
              },
            },
          }}
        />
    <Router>
      <Routes>
        <Route path={'/sign-up'} Component={Signup}/>
        <Route path={'/sign-in'} Component={Login}/>
        <Route path={'/room'} Component={Joinroom}/>
        <Route path={'/chatroom'} Component={Chatarea}/>
        <Route path="/" Component={Home}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
