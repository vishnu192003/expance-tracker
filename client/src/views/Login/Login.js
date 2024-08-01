import React, { useState } from 'react'
import "./Login.css"
import {Link} from "react-router-dom"
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginNow = async()=>{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`,{
      email: email,
      password: password
    })
    if(response.data.success){
      toast.success("Login Successful!!")

      // add user data to local storage for future use
      localStorage.setItem("currentUser", JSON.stringify(response.data.data))

     toast.loading("Redirecting to Dashboard...")
      setTimeout(() => {
        window.location.href = "/"
      }, 1000);
     
  }
  else{
     toast.error("Invalid Credentials")
 
  }
}

  return (
    <div>
      <h1 className='heading'>Login Now</h1>

      <form action="" className='auth-form'>
       <input type="email"
        placeholder="Email"
         className='user-input'
         value={email}
         onChange = {(e)=>{
           setEmail(e.target.value)
         }}
         />
       <input type="password"
        placeholder="Password"
         className='user-input'
         value={password}
         onChange = {(e)=>{
           setPassword(e.target.value)
         }}
         />
       <button className='btn'
        type='button'
        onClick={loginNow}
        >Login</button>
       <br />
       <Link to="/Signup" className='link'>Don't have an Account? Signup</Link>

      </form>
      <Toaster/>
    </div>
  )
}

export default Login