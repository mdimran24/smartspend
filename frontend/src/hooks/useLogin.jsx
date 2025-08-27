import { useAuthContext } from "./useAuthContext";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function login(email, password) {
    const formDetails = new URLSearchParams();

    formDetails.append("username", email);
    formDetails.append("password", password);
    try {
      const response = await api.post("/auth/token", formDetails, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        
        // update the auth context
        dispatch({ type: "LOGIN", payload: response.data });
        
        navigate("/expenses");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Login failed", err);

    }
  }
  return { login, isLoading, error };
};
