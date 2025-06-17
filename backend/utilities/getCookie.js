function getCookie(cookie,name){
  if (!cookie || !name) return null
  
  const separeteAll = cookie?.split("; ")
  let originalCookie = null
  for(let i = 0;i<separeteAll.length;i++){
    const [key,value] = separeteAll[i].split("=")
    if(key===name){
      originalCookie = value
      break
    }
  }
  return originalCookie
}
module.exports = getCookie