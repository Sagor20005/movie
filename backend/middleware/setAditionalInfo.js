function setInfo(req,resp,next){
  resp.locals.baseurl = req.protocol +"://"+req.host
  next()
}

module.exports = setInfo