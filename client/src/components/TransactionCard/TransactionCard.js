import React from 'react'
import "./TransactionCard.css"
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

function TransactionCard({_id, title, amount, category, type, createdAt, loadTransactions}) {

  const deleteTransaction = async ()=>{
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${_id}`)

    toast.success(response.data.message)
    

    loadTransactions()
  }

  return (
    <div className='transaction-card'>
        <h1 className='title'>{title}</h1>
      <span className='date'>
        {new Date(createdAt).toLocaleString()}
      </span>

      <span className='category'>
        {category}
      </span>

        <span className='amount' style={{color: type === "credit" ? "green" : "red"}}>

          {type === "credit" ? "+" : "-"}
            {amount}
        </span>
        <div class="wrap-delete"><button class="button-delete" onClick={deleteTransaction}><span class='text'>Delete</span></button></div>
        <Toaster/>
    </div>

  )
}

export default TransactionCard