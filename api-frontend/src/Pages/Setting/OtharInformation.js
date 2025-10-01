import Input from "../Elements/Input.js"

export default function OtharInformation({ setSetting, setting }){
  
  function HandleOnChange(key,value){
    setSetting((prev)=>{
      return {
        ...prev,
        [key]:value
      }
    })
  }
  
  return(
    <div>
        <h3 className="text-2xl">Others</h3>
        <div>
          
          <Input name="Site_url" text="API URL: " value={setting?.Site_url} onChange={HandleOnChange} />
          <Input name="Site_name" text="SITE NAME: " value={setting?.Site_name} onChange={HandleOnChange} />
          
        </div>
      </div>
    )
}