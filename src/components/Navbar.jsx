import React, { useState, useEffect} from 'react'
import { navigate, useNavigate } from 'react-router-dom'


function Navbar() {


const [isLogin , setIsLogin ] = useState(false)
const navigate = useNavigate()

useEffect(()=>{
  setIsLogin(localStorage.getItem("user_token"))
}, [])

useEffect(()=>{
  setIsLogin(localStorage.getItem("user_token"))
}, [isLogin])

 const logoutUser = () => {
    localStorage.removeItem("user_token");
    setIsLogin(false)
    navigate("/login")
    window.location.reload()
  };

// const isLogin = localStorage.getItem("user_token")

  return (
    
    <div className='bg-black flex flex-row justify-between items-center px-10 h-20'>
        <div className='text-white  '>
        <p onClick={() => navigate("/")}>Practical test</p>
        </div>
        <div className='text-white flex flex-row justify-between items-center gap-10'>
        {
          !isLogin?
          ( 
          <>
          <p onClick={() => navigate("/login")}>Login</p> 
          <p onClick={() => navigate("/register")}>Register</p>
          </>
          )
          : <p onClick={() => logoutUser()}>Logout</p>
        }
        </div>
    </div>
  )
}

export default Navbar