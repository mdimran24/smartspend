import { useAuthContext } from "./useAuthContext";
import api from "../api";
import { useState } from "react";


export const useUpdateExpense = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

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
            }
        } catch (error){
            setIsLoading(false);
            console.error("Expense Update Failed", error)
        }
    }


      return { updateExpense, isLoading, error };
}