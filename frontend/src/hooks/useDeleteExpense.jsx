import { useAuthContext } from "./useAuthContext";
import api from "../api";
import { useExpenseContext } from "./useExpenseContext";

export const useDeleteExpense = () => {
    const { user } = useAuthContext();
    const { dispatch } = useExpenseContext();

    async function deleteExpense(id){
        try{
            const response = await api.delete(`/expenses/${id}`, 
                { headers: { Authorization: `Bearer ${user.access_token}`},
                });

            alert("Success", response.data)
            dispatch({ type: "DELETE_EXPENSE", payload: id });
    
        } catch (error){
            console.error("Expense Deletion Failed", error)
        }

    }

    return { deleteExpense }
}