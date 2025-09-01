import { ExpenseContext } from "../context/ExpenseContext"
import { useContext } from "react";

export const useExpenseContext = () => {
    const context = useContext(ExpenseContext)

    if (!context){
        throw Error('useExpenseContext must be use inside an ExpenseContextProvider')
    }

    return context
}

// This double checks if we are in the scope of using "useExpenseContext"