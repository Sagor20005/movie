const Express = require('express')
const app = Express()

app.use(Express.json())


function sendReq(){
  setInterval(async ()=>{
    try{
      let result = await fetch("https://movie-by36.onrender.com/admin/tarnon")
      result = await result.json()
    }catch(err){ }
  },300000)
}
sendReq()

// Error handling 
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ message: "Oops! Something went wrong." });
});


app.listen(7000,"0.0.0.0",()=> console.log({
  status:"Alive",
  author:"Jakareya haldar"
}))
