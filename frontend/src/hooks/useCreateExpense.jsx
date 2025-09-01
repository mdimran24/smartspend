import { useAuthContext } from "./useAuthContext";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExpenseContext } from "../context/ExpenseContext";
export const useCreateExpense = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const { dispatch } = useExpenseContext();

    async function addExpense(name, amount, category, timestamp){

        try{
            const response = await api.post("/expenses", 
                {
                    name,
                    amount,
                    category,
                    date: timestamp,
                },
                { headers: { "Content-Type": "application/json",
                  Authorization: `Bearer ${user.access_token}`},
                });
            dispatch({type: "ADD_EXPENSE", payload: response.data})
        
        } catch (error){
            setIsLoading(false);
            setError(error.message)
            console.error("Expense Creation Failed", error)
        }
    }


      return { error, isLoading, addExpense };
}