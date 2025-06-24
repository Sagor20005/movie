
graph_url = "https://graph.facebook.com/v23.0/"
const page_id = "648752811662848"
const access_token = "EAAKdBjJ7LxMBO2YpGi3YQo07dIAMzOZBtv3UDUVNOsapA637ZBHmxZCVkXUD3cu7nvvbsCZAsJuMAdIFb4ZB3mZC36cxsCyXCJSgDsiTpfZAncsrrVTbrq9Hk4ygFQvb8sBxzDrqLuFrlkbR1IU2dQhbeZBovputeUcolDSkacCuzpt08uC0RwrhHGpZB4UDOIG8NuFZCo8mWu"

async function addPost(Title,Images,url_name){
  if(!Title || !Images) return false
  Title = Title[0].toUpperCase() + Title.slice(1) // Transform capitalize
  try{
    // upload photos
    const photos_ids = await uploadImage(Images,0,[],access_token)
    
    // genarete body 
    const formData = new FormData()
    formData.append("access_token",access_token)
    formData.append("message",`
    🎬 ${Title} 🔥

⚡সাইটে আপলোড করা হয়েছে💥

✅ Quality : High Rasulation 🔔
📥 Visit And Download Now

____________________
Movie Link 👉 https://newflex.vercel.app/content/${url_name}
____________________
    `);
    
    photos_ids.forEach((id,i)=> formData.append(`attached_media[${i}]`,JSON.stringify({ "media_fbid": id })) )
    // post 
    let post_response = await fetch(`${graph_url}${page_id}/feed`,{
      method: "POST",
      body: formData
    })
    post_response = await post_response.json()
    console.log(post_response)
  }catch(err){
    console.log(err.message)
  }
}


function uploadImage(images,i,return_val,token){
  
  return new Promise( (resolve,reject)=>{
    
    async function upload(images,i,return_val,token){
      if (i === images.length) return return_val
      
      const image = images[i]
      let upload_res = await fetch(graph_url+page_id+"/photos",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify({
          access_token: token,
          url: image,
          published: false
        })
      })
      upload_res = await upload_res.json()
      return_val.push(upload_res.id)
      return upload(images,i+1,return_val,token)
    }
    
    const ids = upload(images,i,return_val,token)
    resolve(ids)
  })
  
}


// addPost("Taandob",[
//   "https://image.tmdb.org/t/p/w780/v1U3lht8yAgdL9FdpzxlznAqNWH.jpg",
//   "https://iili.io/FqkbE0b.jpg"
//   ],"taandob")

module.exports = addPost