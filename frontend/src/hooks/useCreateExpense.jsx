import { useAuthContext } from "./useAuthContext";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCreateExpense = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

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
            if (response.data.id){
                alert("success", response.data)
            }
        } catch (error){
            setIsLoading(false);
            console.error("Expense Creation Failed", error)
        }
    }


      return { addExpense };
}