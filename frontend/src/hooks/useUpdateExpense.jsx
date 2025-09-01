import { useAuthContext } from "./useAuthContext";
import api from "../api";
import { useState } from "react";
import { useExpenseContext } from "./useExpenseContext";

export const useUpdateExpense = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const { dispatch } = useExpenseContext();
    async function updateExpense(name, amount, category, timestamp, id){

        try{
            const response = await api.put(`/expenses/${id}`,
                {
                    name,
                    amount,
                    category,
                    date: timestamp,
                },
                { headers: { "Content-Type": "application/json",
                  Authorization: `Bearer ${user.access_token}`},
                });
            if (response.data.id){
                // alert("success", response.data)
                 dispatch({ type: "UPDATE_EXPENSE", payload: response.data });
            }
        } catch (error){
            setIsLoading(false);
            setError(error.message)
            console.error("Expense Update Failed", error)
        }
    }


      return { updateExpense, isLoading, error };
}