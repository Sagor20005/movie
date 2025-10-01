export default function passedMoment(createdTimeStr){
  const createdTime = Date.parse(createdTimeStr)
  const currentTime = Date.now()
  const passedTime = currentTime - createdTime
  const sec = 1000
  const min = 1000*60
  const hour = min*60
  const day = hour*24
  const month = day*30
  const year = month*12
  const millObj = { sec, min, hour, day, month, year }
  
  const dateStuctar = Object.keys(millObj)
  
  for(let i = 0; i < dateStuctar.length; i++){
    const fild = millObj[dateStuctar[i]]
    if(passedTime <= fild){
      return  Math.floor(passedTime / millObj[dateStuctar[i-1]]) + dateStuctar[i-1]
    }
    if(i === dateStuctar.length-1){
      return  Math.floor(passedTime / millObj[dateStuctar[i]]) + dateStuctar[i]
    }
  }
}