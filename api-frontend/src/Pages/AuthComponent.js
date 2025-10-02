import { Outlet, Navigate } from "react-router-dom" 

 export default function AuthComponent({IsAuth}){
   return IsAuth ? <Outlet /> : <Navigate to="/login" />
 }