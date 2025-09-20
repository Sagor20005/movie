import {useState,useEffect} from "react"
import { useLocation } from "react-router-dom"
import Select from "./SubComponents/Select.js"
import Button from "./Elements/Button.js"
import MultiTextFild from "./SubComponents/MultiTextFild.js"
import RadioToggle from "./SubComponents/RadioToggle.js"
import AddPoster from "./SubComponents/AddPoster.js"
import ImagesComponent from "./SubComponents/ImagesComponent.js"
import DownloadSection from "./SubComponents/DownloadSection.js"
import GenreManager from "./SubComponents/GenreManager.js"
import {Fild_config,template} from "./store_config.js"
import {useLocalStorage} from "../hooks/useLocalStorage.js"
import { ToastContainer, toast } from 'react-toastify';

export default function AddContent() {
  const { state } = useLocation()
  // Download Input State
  const [Download,
    setDownload] = useLocalStorage("Download", {
      url: "", language: "", quality: "", size: "", title: "All"
    })
  // Content Data state
  const [content,
    setContent] = useLocalStorage("content", template)

  
  useEffect(()=>{
    async function GetContent(){
      const Api = process.env.REACT_APP_API_URL || null
      if( !Api || !state) return null
      try{
        const request = await fetch(Api+"/getbyid/"+state.id)
        const response = await request.json()
        console.log(response)
        if(response.isOk){
          setContent(response.movie)
        }
      }catch(err){
        
      }
    }
    GetContent()
  },[])
  
  
  // Toggle Handlar
  function toggleHandle(name, cb) {
    setContent((prev)=> {
      return {
        ...prev, [name]: !content[name]}
    })
    cb()
  }

// Submit The Content Function
  async function SubmitContent(content) {
    console.log(content)
    return
    try {
      const Api = process.env.REACT_APP_API_URL || null
      if (!Api) return null
      if(Download.url) throw Error("Please put corsor on Doenload Input & Press Enter button!")
      const options = {
        method: "post",
        body: JSON.stringify(content),
        headers: {
          "content-type": "application/json"
        }
      }
      let response = fetch(Api+"/addMovi", options)
      toast.promise(response,{
        pending: 'Promise is pending',
        success: 'Promise resolved 👌',
        error: 'Promise rejected 🤯'
      })
      response = await response.json()
      if (response.isOk) {
        alert("Success to add!")
      } else {
        toast.error("Faild to Save!")
      }
    }catch(err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  // Main Jsx Content
  return(
    <div className="p-2">
      <ToastContainer />
      {/* Text Fields */}
      <MultiTextFild Fild_config={Fild_config} state={[content, setContent]} />

      {/* Type and Genre sectiin */}
      <div>
        {/*<Select state={[content,setContent]} value={content.Type} id="type" label="Type" name="type" defaultValue="" defaultText="Choose an Option" options={["movie","series"]}  />*/}
        <RadioToggle onClick={(name, cb)=>toggleHandle(name, cb)} name="Trand" isOn={content.Trand} />
        <RadioToggle onClick={(name, cb)=>toggleHandle(name, cb)} name="AutoShow" isOn={content.AutoShow} />
        <RadioToggle onClick={(name, cb)=>toggleHandle(name, cb)} name="Featured" isOn={content.Featured} />
      </div>

      {/*Genre Section*/}
      <GenreManager state={[content, setContent]} />

      {/* Download Section */}
      <DownloadSection content={content} setContent={setContent} setDownload={setDownload} Download={Download} Data={content.Downloads} state={[Download, setDownload]} />

      {/* Images Section */}
      <div className="grid md:grid-cols-2 gap-4 p-4 ">
        <AddPoster state={[content, setContent]} />
        <ImagesComponent state={[content, setContent]} />
      </div>

      <Button text="Post The Content" onClick={()=>SubmitContent(content)} />
    </div>
  )
}