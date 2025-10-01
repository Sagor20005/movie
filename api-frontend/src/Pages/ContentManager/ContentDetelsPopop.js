import { useContext } from "react"
import { MainContext } from "../../context/MainStateContext.js"
import RadioToggle from "../Elements/RadioToggle.js"
import Button from "../Elements/Button.js"
import { useNavigate } from "react-router-dom"
import { useCreatePost } from "../../hooks/useCreatePost.js"
import Swal from 'sweetalert2'

export default function ContentDetelsPopop( {
  open, setIsOpen, content_id, index
}) {
  const Navigate = useNavigate()
  const Api = process.env.REACT_APP_API_URL

  const [{ contents }, setMainState] = useContext(MainContext)
  const currContent = contents.find((content)=> content._id === content_id)


  function ClosePopop(e) {
    // Stop Boobleing
    e.stopPropagation()
    // Set Close Popop
    setIsOpen(false)
  }

  function UpdateStatus(Fild, Value) {
    return new Promise(async(resolve, reject)=> {
      let response = await fetch(Api+"/fildupdate", {
        method: "put",
        body: JSON.stringify({
          _id: content_id,
          Fild, Value
        }),
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      resolve(response)
    })
  }

  async function HandleClick(name, cb) {

    await UpdateStatus(name, !currContent[name])

    const Index = contents.findIndex((e)=> e._id === content_id)
    const content = contents[Index]
    content[name] = !content[name]
    const originalData = contents
    originalData.splice(Index, 1, content)
    setMainState((prev)=>({
      ...prev, contents: originalData
    }))
    cb()
  }


  async function DeleteContent(_id) {
    
    // Alert for delete 
    const alertRes = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    
    if(!alertRes.isConfirmed) return // If Close then End Function
    
    
    if (!Api) return  // If Api Url Not Avleable Then return
    try {
      // Req Object
      const options = {
        method: "delete",
        body: JSON.stringify({ _id}),
        headers: {
          "content-type": "application/json"
        }
      }
      // Request on server
      const request = await fetch(Api+"/remove-con", options)
      const response = await request.json()
      if (response.isOk) {
        setMainState((prev)=> {
          return ({
            ...prev,
            contents: [...prev.contents.filter((movie)=> (movie._id !== _id))]
          })
        })
        setIsOpen(false)
        Swal.fire("Delete Success!")
      } else {
        Swal.fire(response.msg)
      }
    }catch(err) {Swal.fire(err.message)}
    
  }

  // CREATE POST FUNCTION
  async function CreatePost(){
    await useCreatePost(content_id)
  }


  if (!open) return
  return(
    <>
      

      <div className={`z-[${1000*index}] min-h-[200px] w-[300px] bg-[#e9e8f3] fixed top-32 left-[50%] -translate-x-[50%] rounded-2xl shadow-md px-3 py-6`}>
        <i onClick={(e)=>ClosePopop(e)} className="absolute top-5 right-5 fa-solid fa-xmark"></i>
        <h1 className="text-2xl text-center py-2">{currContent.Title}</h1>
        <RadioToggle onClick={HandleClick} name="Trand" isOn={currContent.Trand} />
        <RadioToggle onClick={HandleClick} name="Featured" isOn={currContent.Featured} />
        <RadioToggle onClick={HandleClick} name="AutoShow" isOn={currContent.AutoShow} />
        <Button onClick={()=>DeleteContent(content_id)} text="Delete" />
        <Button onClick={()=>Navigate("/add", { state: { id: content_id }})} text="Update" />
        <Button onClick={CreatePost} text="Create Post" />
      </div>
    </>
  )
}