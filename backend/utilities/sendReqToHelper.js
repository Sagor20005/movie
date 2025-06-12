function SendRequest(url) {
  setInterval(async()=> {
    try {
      let response = await fetch(url)
      response = await response.json()
    }catch(err) {
    }
  }, 240000)
}
module.exports = SendRequest