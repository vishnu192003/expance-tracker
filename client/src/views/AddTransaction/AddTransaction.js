import axios from 'axios'
import React, { useState, useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import "./AddTransaction.css"

function AddTransaction() {

    const [user, setUser] = useState('')
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('credit')


    useEffect(()=>{
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    
        if(currentUser){
          setUser(currentUser)
        }
    
        if(!currentUser){
          window.location.href = "/login"
        }
      },[])

      const addTransaction = async ()=>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/transaction`,{
            user: user._id,
            title,
            amount,
            category,
            type
        })
        console.log(response)
        if(response.data.success){
          toast.success("Transaction Added Successfully")

          setTitle('')
          setAmount(0)
          setCategory('')
          setType('')
        }
        else{
          toast.error("Failed to Add Transaction")
        }

      

        setTimeout(() => {
            window.location.href = "/"
        }, 1000);
      }


  return (
    <div>
        <h1 className='add-name'>Hey👋,{user.fullName}</h1>
        {/* <h3 className='h3'>Add Your Transactions Here!!</h3> */}
        <h2 className='heading'>Add Transaction</h2>
        <div className='form-div'>
        <form action="" className='auth-form'>
            <input
            type="text"
            placeholder="Title"
            className="user-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <input
            type="number"
            placeholder="Amount"
            className="user-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />

            <select className='select'
            value={type}
            onChange = {(e)=> setType(e.target.value)}
            >
                <option value="credit">Income</option>
                <option value="debit">Expense</option>
            </select>

            <select name="" id="" className='select' value={category}
            onChange = {(e)=> setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Shopping">Shopping</option>
                <option value="Utilities">Utilities</option>
                <option value="Savings">Savings</option>
                <option value="Investments">Investments</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Charity">Charity</option>
                <option value="Pet">Pet</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Family">Family</option>
                <option value="Holidays">Holidays</option>
                <option value="Loan">Loan</option>
                <option value="Loan Repayment">Loan Repayment</option>
                <option value="Gift">Gift</option>
                <option value="Donation">Donation</option>
                <option value="Travel">Travel</option>
                <option value="Learning">Learning</option>
                <option value="Other">Other</option>
            </select>

            <button type="button" className='btn' onClick={addTransaction}>Add Transaction</button>
        </form>
        </div>
        <Toaster />
    </div>
  )
}

export default AddTransaction