import { useState, useEffect } from "react"

export function useLocalStorage(name,initialData){
  const [data,setData] = useState(initialData)
  useEffect(()=>{
    const localStorageData = window.localStorage.getItem(name)
    if(localStorageData){
      setData(JSON.parse(localStorageData))
    }else{
      window.localStorage.setItem(name,JSON.stringify(initialData))
    }
  },[])
  
  
  function updateData(argument){
    if(typeof(argument) === "function"){
      setData(argument(data))
      window.localStorage.setItem(name,JSON.stringify(argument(data)))
    }else{
      setData(argument)
      window.localStorage.setItem(name,JSON.stringify(argument))
    }
  }
  
  
  return [data,updateData]
}