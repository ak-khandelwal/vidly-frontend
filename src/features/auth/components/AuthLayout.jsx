import { useState } from "react"
import { selectCurrentToken } from "../slice/authSlice"
import { Navigate } from "react-router-dom";

function AuthLayout({Children}) {
  const token =  useState(selectCurrentToken);
  if(token == null){
    return (<Navigate to="/login" state={{ from: location }} replace />)
  }
  return <Children />
}

export default AuthLayout