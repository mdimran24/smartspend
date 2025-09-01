import React, { useState } from 'react';
import { useCreateExpense } from '../hooks/useCreateExpense';
import { useUpdateExpense } from '../hooks/useUpdateExpense';
import { useEffect } from 'react';

export default function ExpenseForm( {expense} ) {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")


    const {createError, createIsLoading, addExpense} = useCreateExpense()

    const {updateError, updateIsLoading, updateExpense} = useUpdateExpense()

    const handleCreateSubmit = async (e) => {
      e.preventDefault();
      addExpense(name, amount, category, new Date().getTime());
      setAmount("")
      setName("")
      setCategory("")

    };
    
    const handleUpdateSubmit = async (e) => {
      e.preventDefault();
      updateExpense(name, amount, category, new Date().getTime(), expense.id);

    };

    useEffect(() =>{

    if(expense){
      setAmount(expense.amount)
      setName(expense.name)
      setCategory(expense.category)
    }
  }, [expense]);
    return(
    <>

    <form className="max-w-[400px] mt-24 m-auto p-5 bg-white rounded" onSubmit={expense ? handleUpdateSubmit : handleCreateSubmit}>
      <h3 className="text-2xl font-semibold py-4 ">{expense ? "Update Expense" : "Create Expense"}</h3>

      <label>Expense:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value= {name}

        required
      />
      <label>Amount:</label>
      <input 
        type="number" 
        onChange={(e) => setAmount(e.target.value)} 
        value= {amount}

        required
      />

    <div className="custom-select">
        <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required="required"
            className="my-2 w-[100%] border rounded-md py-3"
            
          >
            <option>Select Category</option>
            <option value="Eating Out">Eating Out</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Transport">Transport</option>
          </select>
          
        </div>
      

      <button className="mt-4 bg-blue-600 text-white font-bold  text-sm px-4 py-2 rounded shadow hover:bg-blue-700 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-[100%]">{expense ? "Update" : "Add"}</button>
      {expense ? updateError : createError && <div className="error">{expense ? updateError : createError}</div>}
    </form>
    </>
)

}

