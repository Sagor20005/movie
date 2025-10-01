import {useEffect} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Select from "../Elements/Select.js"
import Button from "../Elements/Button.js"
import MultiTextFild from "../Elements/MultiTextFild.js"
import RadioToggle from "../Elements/RadioToggle.js"
import AddPoster from "./ImageHandle/AddPoster.js"
import ImagesComponent from "./ImageHandle/ImagesComponent.js"
import DownloadSection from "./DownloadLinkManager/DownloadSection.js"
import GenreManager from "./Genre/GenreManager.js"
import {Fild_config,template} from "../store_config.js"
import {useLocalStorage} from "../../hooks/useLocalStorage.js"
import Swal from 'sweetalert2'

export default function AddContent() {
  const { state } = useLocation()
  const Navigate = useNavigate()
  
  
  // Download Input State
  const [Download,
    setDownload] = useLocalStorage("Download", {
      url: "", language: "", quality: "", size: "", title: "All", _id:crypto.randomUUID()
    })
  // Content Data state
  const [content,
    setContent] = useLocalStorage("content", template)

   // Is Update State 
  const [isUpdate,setIsUpdate] = useLocalStorage("isUpdate",!!content._id)
   
  useEffect(()=>{
    
    // Get Content For update Mode
    async function GetContent(){
      const Api = process.env.REACT_APP_API_URL || null
      if( !Api || !state) return null // if empty api or state then quit hear
      try{
        const request = await fetch(Api+"/getbyid/"+state.id)
        const response = await request.json()
        if(response.isOk){
          // Set content
          setContent(response.movie)
          setIsUpdate(true)
        }
      }catch(err){
        // Handle error
      }
    }
    GetContent() //Calling GetContent
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
    try {
      const route = isUpdate ? "/update-movie" : "/addMovie" // Set Server Route Path Dynamickly
      const Api = process.env.REACT_APP_API_URL || null
      if (!Api) return null
      if(Download.url) throw Error("Please put corsor on Doenload Input & Press Enter button!")
      const options = {
        method: isUpdate ? "put" : "post",
        body: JSON.stringify(content),
        headers: {
          "content-type": "application/json"
        }
      }
      let response = await fetch(Api+route, options)
      response = await response.json()
      if (response.isOk) {
        setContent(template)
        if(isUpdate) {
          Navigate("/manage-content")
          setIsUpdate(false)
        }
        Swal.fire("Success to add!")
      } else {
        Swal.fire("Faild to Save!")
      }
    }catch(err) {
      console.log(err)
      Swal.fire(err.message)
    }
  }

  // Main Jsx Content
  return(
    <div className="p-2">
      {/* Text Fields */}
      <MultiTextFild 
      onChange={(key,val)=>{
        setContent((prev)=>{
          return {
            ...prev,[key]:val
          }
        })
      }}
      Fild_config={Fild_config} state={[content, setContent]} />

      {/* Type and Genre sectiin */}
      <div>
        <Select onChange={(e)=>{
          setContent((prev)=>{
            return {
              ...prev,
              Type:e.target.value
            }
          })
        }} value={content.Type} id="type" label="Type" name="Type" options={["movie","series"]}  />
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

      <Button text={content._id ? "Update The Content" : "Post The Content"} onClick={()=>SubmitContent(content)} />
      <Button onClick={()=>setContent(template)} text="Clear" />
    </div>
  )
}