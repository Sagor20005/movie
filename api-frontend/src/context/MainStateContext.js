import { useLocalStorage} from "../hooks/useLocalStorage.js"
import { createContext, useState, useEffect } from "react"


export const MainContext = createContext()

export function MainStateContext ( {
  children
}) {
  
  const State = {
    contents:[],
    aditionalData:{
      Genre:[]
    }
  }
  const [MainState,
      setMainState] = useState(State)



  useEffect(()=> {
    async function FetchContents() {
      try {
        let res = await fetch(process.env.REACT_APP_API_URL+"/all")
        res = await res.json()
        if (res.isOk) {
          setMainState((prev)=>({
            ...prev, contents: res.data
          }))
        }
      }catch(err) {
        console.log(err)}
    }

    async function FetchAditionalData() {
      try {
        let res = await fetch(process.env.REACT_APP_API_URL+"/aditional")
        res = await res.json()
        if (res.isOk) {
          setMainState((prev)=>({
            ...prev, aditionalData: res.data
          }))
        }
      }catch(err) {
        console.log(err)}
    }
    
    FetchContents()
    FetchAditionalData()
  },
    [])

  return (
    <MainContext.Provider value={[MainState,setMainState]}>
      {children}
    </MainContext.Provider>
  )
}