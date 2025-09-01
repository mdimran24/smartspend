import api from "../api";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    async function signup(email, password, name){
        
        try{
            const response = await api.post("/auth", { email, password, name}, 
                { headers: { "Content-Type": "application/json"}
                });
                if(response.data){
                    alert("Success", response.data)
                    // save the user to local storage
                    setIsLoading(false);
                    navigate("/login");
                }
        } catch (error){
            setIsLoading(false);
            setError(error.message)
            console.error("Couldn't sign in", error)
        }
    }

    return {error, isLoading, signup};
}