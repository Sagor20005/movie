function ifobjallvalue(obj){
  if(obj && typeof(obj) === "object"){
    return Object.keys(obj).every((key)=> !!obj[key] )
  }
  return false
}

module.exports = ifobjallvalue;