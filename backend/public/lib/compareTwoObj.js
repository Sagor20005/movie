function Compare(count,filds,updatedFilds,previousObj,afterObj){
  if(count === filds.length){
    return updatedFilds
  }
  
  const currFild = filds[count]
  if(typeof(previousObj[currFild]) === "object"){
    const nastVal = Compare( 0 ,Object.keys(previousObj[currFild]) ,updatedFilds ,previousObj[currFild],afterObj[currFild])
    updatedFilds.concat(nastVal)
  }else{
    if(previousObj[currFild] !== afterObj[currFild]){
      updatedFilds.push(currFild)
    }
  }
  return Compare( count+1 ,filds ,updatedFilds ,previousObj,afterObj)
  
}

//Compare( 0, Object.keys(obj1), [], obj1, obj2 )
export default Compare