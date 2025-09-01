import { useAuthContext } from "./useAuthContext";
import { useExpenseContext } from "./useExpenseContext";
import api from "../api";

export const useFetchExpenses = () => {
  const { user } = useAuthContext();
  const { dispatch } = useExpenseContext();

  async function fetchExpenses() {
    try {
      const res = await api.get("/expenses", {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });

      // 🔹 Replace entire list
      dispatch({ type: "SET_EXPENSES", payload: res.data });

    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  }

  return { fetchExpenses };
};