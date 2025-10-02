import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function Login({ setIsAuth, IsAuth }) {
  const Navigate = useNavigate()
  const [cred,setCred] = useState({ username:"",password:"" }) // input data
  const [time,setTime] = useState(null) // Timeout id 
  const Api = process.env.REACT_APP_API_URL // server
  
  // Return to home if auth have
  if(IsAuth){
    Navigate("/")
  }
  
  // Handle change 
  function onChange(e){
    const { name, value } = e.target
    // Change Auth Cred
    setCred((prev)=>({
      ...prev, [name]:value
    }))
  }
  
  
  // Check for Login
  async function LoginCheck(){
    if(!cred.username|| !cred.password) return
    try{
      const formData = new FormData()
      formData.append("username",cred.username)
      formData.append("password",cred.password)
      
     let response = await fetch(Api+"/admin/login",{
       method:"post",
       body:formData
     })
     response = await response.json()
     if(response.isOk){
       setIsAuth(true)
       Navigate("/")
     }else{
       setIsAuth(false)
       Swal.fire(response.msg)
     }
    }catch(err){Swal.fire(err.message)}
  }
  
  
  useEffect(()=>{
    // cancel Previous Call
    if(time){
      clearInterval(time)
    }
    
    // Set new call
    setTime(setTimeout(LoginCheck,2000))
  },[cred])
  
  
  
  return(
    <div className="h-dvh flex flex-col justify-center items-center">

      <div className=" bg-blue-100 p-5 flex flex-col justify-center items-center rounded-md shadow-md ">
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col p-2">
          <label for="user">Usarname</label>
          <input name="username" onChange={onChange} value={cred.user} className="bg-transparent p-2 outline-none border-[1px] border-white rounded-md shadow-md text-black" id="user" placeholder="~" type="text" />
          <label for="password">Password</label>
          <input name="password" onChange={onChange} value={cred.password}  className="bg-transparent p-2 outline-none border-[1px] border-white rounded-md shadow-md text-black" id="password" placeholder="~" type="text" />
      </div>
    </div>

  </div>
)
}