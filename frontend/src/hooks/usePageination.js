import { useState, useEffect } from "react"

export function usePageination(name, totalLength, maxCon=12){
  const [ pageNo, setPageNo ] = useState(0)
  const maxPages = getTotalPage(maxCon,totalLength)
  
  useEffect(()=>{
    // Get from ls 
    const ls = window.localStorage.getItem(name)
    const Data = ls ? JSON.parse(ls) : null
    if(Data){
      if(Data.expire >= Date.now()){
        setPageNo(Data.pageNo)
      }else{
        window.localStorage.removeItem(name)
      }
    }
  },[])
  
  
  
  // Genaret Start End
  const startEnd = {
    start: pageNo*maxCon,
    end: pageNo*maxCon +maxCon
  }
  
  function getTotalPage(max,total){
    const devidedByMax = total/max
    const devidedByMaxFloor = Math.floor(devidedByMax)
    if(devidedByMax === devidedByMaxFloor){
      return devidedByMax-1
    }else{
      return devidedByMaxFloor
    }
  }
  
  function updateLocalStorage(page){
    const data = {
      expire: Date.now()+60000*5,
      pageNo:page
    }
    window.localStorage.setItem(name,JSON.stringify(data))
  }
  
  // Increas By one
  function nextPage(){
    if(pageNo >= maxPages) return
    updateLocalStorage(pageNo+1)
    setPageNo(pageNo+1)
  }
  // decreas By one
  function previousPage(){
    if(pageNo === 0) return
    updateLocalStorage(pageNo-1)
    setPageNo(pageNo-1)
  }
  // Reset page 
  function JumpPage(numbar){
    if(numbar < 0 || numbar > maxPages) return
    setPageNo(numbar)
    updateLocalStorage(numbar)
  }
  
  // Return Pageination data
  return {
    startEnd,
    pages:{
      current:pageNo+1,
      max: maxPages+1
    },
    nextPage,
    previousPage,
    JumpPage
  }
}