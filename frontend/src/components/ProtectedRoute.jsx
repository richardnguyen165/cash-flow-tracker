// Source for learning: https://www.youtube.com/watch?v=c-QsfbznSXI

// Use this for ANY ROUTE that needs a user to be logged in (in this case, anything NOT sign up, log in, and landing page)

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants/constants";
import { useState, useEffect } from "react";

export function ProtectedRoute({ children }) {
  // Use a state to check first if it is authorized

  const [authorizedState, setAuthorizedState] = useState(null);


  // Use only on mount once (when on first render)
  useEffect(() => {
    auth().catch(() => setAuthorizedState(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      // Ok request, give the user an access token, meaning that they are logged in
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setAuthorizedState(true)
      } else {
        setAuthorizedState(false)
      }
    // Not logged in 
    } catch (error) {
      console.log(error);
      setAuthorizedState(false);
    }
  }

  // This function is responsible for getting the access token
  const auth = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    
    // It means that you were never logged in
    if (!accessToken){
      setAuthorizedState(false);
      return;
    }

    const accessTokenDecoded = jwtDecode(accessToken);
    const tokenExpirationDate = accessTokenDecoded.exp;
    const current_date = Date.now() / 1000;

    // We use the refresh token to refresh the access token
    if (tokenExpirationDate < current_date){
      await refreshToken();
    }
    else {
      setAuthorizedState(true);
    }
  }

  // It means that we are currently checking for authentication
  if (authorizedState === null) return <div>Loading...</div>;

  // If we are authorized, we return the page we are trying to return, else we go to the sign in page
  if (!authorizedState){
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
  
  return authorizedState ? children : <Navigate to="/signin"/>
}