import { useState, useEffect } from "react"

export function usePageination(name, totalLength, maxCon=12, initPage){
  const [ pageNo, setPageNo ] = useState(0)
  const maxPages = Math.floor(totalLength/maxCon)
  
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
  
  // Return Pageination data
  return {
    startEnd,
    pages:{
      current:pageNo,
      max: maxPages
    },
    nextPage,
    previousPage
  }
}