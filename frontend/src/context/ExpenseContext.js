import { createContext, useContext, useReducer } from "react";

export const ExpenseContext = createContext();

function expenseReducer(state, action) {
  switch (action.type) {
    case "SET_EXPENSES":
      return action.payload;
    case "ADD_EXPENSE":
      return [...state, action.payload];
    case "DELETE_EXPENSE":
      return state.filter(exp => exp.id !== action.payload);
    case "UPDATE_EXPENSE":
      return state.map(exp =>
        exp.id === action.payload.id ? action.payload : exp
      );
    default:
      return state;
  }
}

export function ExpenseContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expenseReducer, []);

  return (
    <ExpenseContext.Provider value={{ expenses, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  return useContext(ExpenseContext);
}