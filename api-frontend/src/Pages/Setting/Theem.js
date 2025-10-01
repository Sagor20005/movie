import InputColor from "../Elements/InputColor.js"

export default function Theem({ setSetting, Colors }){
  
  function SetColors(key,value){
    setSetting((prev)=>{
      return {
        ...prev,
        Colors:{ ...prev.Colors, [key]:value }
      }
    })
  }
  
  return(
    <div>
        <h3 className="text-2xl">Theem</h3>
        <div >
          
          <InputColor 
            text="Text Color"
            name="text_color"
            onChange={SetColors}
            value={Colors?.text_color} />
          <InputColor 
            text="Background Color"
            name="bg_color"
            onChange={SetColors}
            value={Colors?.bg_color} />
          <InputColor 
            text="Title Color"
            name="title_color"
            onChange={SetColors}
            value={Colors?.title_color} />
          <InputColor 
            text="Box Color"
            name="box_bg_color"
            onChange={SetColors}
            value={Colors?.box_bg_color} />
          <InputColor 
            text="Small Text Color"
            name="small_text_color"
            onChange={SetColors}
            value={Colors?.small_text_color} />
          <InputColor 
            text="Link Color"
            name="link_color"
            onChange={SetColors}
            value={Colors?.link_color} />
          <InputColor 
            text="Logo Color"
            name="logo_color"
            onChange={SetColors}
            value={Colors?.logo_color} />
          
        </div>
      </div>
    )
}