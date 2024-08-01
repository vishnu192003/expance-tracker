import React, { useEffect, useState } from 'react'
import "./Home.css"
import toast, { Toaster } from "react-hot-toast"
import axios from 'axios'
import TransactionCard from '../../components/TransactionCard/TransactionCard'
import ImgAdd from "./wallet.png"
import { Link } from 'react-router-dom'

function Home() {

  

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    if (currentUser) {
      setUser(currentUser)
    }

    if (!currentUser) {
      window.location.href = "/login"
    }
  }, [])

  useEffect(() => {
    let income = 0
    let expense = 0

    transactions.forEach(transaction => {
      if (transaction.type === "credit") {
        income += transaction.amount
      } else {
        expense += transaction.amount
      }
    });

    setNetIncome(income)
    setNetExpense(expense)
  }, [transactions])

  const loadTransactions = async () => {
    if (!user._id) {
      return
    }

    toast.loading('Loading transactions...')

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`)

    const allTransactions = response.data.data



    toast.dismiss()

    setTransactions(allTransactions)
  }

  useEffect(() => {
    loadTransactions()
  }, [user])

  return (
    <div>
      <div className='home-div'>
      <h2 className='home-heading'>EXPENSE TRACKER</h2>
        <h1 className='home-greeting'>Hello👋<span className='name'>{user.fullName}</span></h1>
       

        <span className='home-logout' onClick={() => {
          localStorage.clear()
          toast.success("Logged out Successfully")

          setTimeout(() => {
            window.location.href = "/login"
          }, 1000)
        }}>
          Logout
        </span>

        <div className='transactions-value'>
          <div className='items'>
            <span className='amount-value'>+{netIncome}</span>
            <span className='amount-title'>Total Income</span>
          </div>

          <div className='items'>
            <div>
              <span className='amount-value'>-{netExpense}</span>
              <span className='amount-title'>Total Expense</span>
            </div>
          </div>

          <div className='items'>
            <div>
              <span className='amount-value'>{netIncome - netExpense}</span>
              <span className='amount-title'>Total Balance</span>
            </div>
          </div>
        </div>
      </div>


      <div className='transactions-container'>
        {
          transactions.map((transaction) => {
            const { _id, title, amount, category, type, createdAt } = transaction



            return (<TransactionCard
              key={_id}
              _id={_id}
              title={title}
              amount={amount}
              category={category}
              type={type}
              createdAt={createdAt}
              loadTransactions={loadTransactions}
            />)
          })
        }
      </div>
      <Link to="./add-transaction">
        <img src={ImgAdd} className="add-transaction" />
      </Link>
      <Toaster />
    </div>
  )
}

export default Home