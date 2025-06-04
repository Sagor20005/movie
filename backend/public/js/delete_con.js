
export async function delete_images (ids,index,callback){
  if(index >= ids.length) return false
  
  const id = ids[index]
  try{
    let response = await fetch(`/delete-img/${id}`,{method:"delete"})
    response = await response.json()
    if(response.isOk){
      callback(response.data)
    }else{
      callback(response.message)
    }
  }catch(err){
    callback(err.message)
  }
  delete_images(ids,index+1,callback)
}