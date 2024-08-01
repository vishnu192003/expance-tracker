import React, { useState } from 'react'
import "./Signup.css"
import toast, { Toaster } from "react-hot-toast"
import axios from 'axios'
import {Link} from "react-router-dom"


function Signup() {

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: ''
  })

  const signup = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      dob: user.dob
    })

    if (response.data.success) {
      toast.success("Signup Successful!!")

      setUser({
        fullName: '',
        email: '',
        password: '',
        dob: ''
      })
      toast.loading("Redirecting to Login Page")
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000);
    }
    else {
      toast.error("Signup Failed!! Please try again.")
    }

    console.log(response)
  }

  return (
    <div>
      <h1 className='heading'>Signup Now</h1>

      <form className='form'>
        <input type="text"
          placeholder="Full Name"
          className='user-input'
          value={user.fullName}
          onChange={(e) => {
            setUser({ ...user, fullName: e.target.value })
          }}
        />
        <input type="email"
          placeholder="Email"
          className='user-input'
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value })
          }}
        />
        <input type="password"
          placeholder="Password"
          className='user-input'
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value })
          }}
        />
        <input type="date"
          placeholder="Date of Birth"
          className='user-input'
          value={user.dob}
          onChange={(e) => {
            setUser({ ...user, dob: e.target.value })
          }}
        />
        <button type="button"
          className='btn'
          onClick={signup}
        >Signup</button>
        <br />
        <Link to="/login" className='link'>Already have an Account? Login</Link>
      </form>
      <Toaster />
    </div>
  )
}


export default Signup