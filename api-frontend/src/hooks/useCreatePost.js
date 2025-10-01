export async function useCreatePost(_id) {
    try {
      const Api = process.env.REACT_APP_API_URL
      const request = await fetch(`${Api}/getbyid/${_id}`);
      const {
        movie,
        isOk
      } = await request.json()
      
      if(!isOk) return

      const caption = `🎬 ${movie.Title.slice(0, 1).toUpperCase() + movie.Title.slice(1)} 🔥
      Link 👉 https://newflex.vercel.app/${movie.Type}/${movie.url_name}

      ⚡সাইটে আপলোড করা হয়েছে💥
      ⚡সবার আগে দেখুন 🌟
      ✅ Quality : High Rasulation 🔔
      📥 Visit And Download Now

      ${"📦 Genre : " + movie.Genre}
      ${"📂 Options : " +movie.Downloads.map((d)=>d.quality)}\n

      ____________________
      Link 👉 https://newflex.vercel.app/${movie.Type}/${movie.url_name}
      ____________________

      ✅ সবার আগে সকল নতুন মুভি দেখতে আমাদের সাথে যুক্ত হন 🤝
      🌐 https://newflex.vercel.app

      ${"🏷️ Year : " + movie.Year}

      ${"📑 Plot: "+movie.Plot}

      ${"🎭 Actors: "+movie.Actors}
      `

      navigator.clipboard.writeText(caption)

      // download all images
      movie?.Images?.forEach(async (image, i)=> {
        try {
          const f = await fetch(image)
          const blob = await f.blob()
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = movie.Title+ " (" + i + ").png"
          a.click()
          setTimeout(()=> {
            URL.revokeObjectURL(url)}, 5000)
        }catch(er) {
          console.log(`err: Download Images : ${er.message}`)}
      })

      // Download poster
      if (movie?.Poster) {
        async function dp() {
          try {
            const f = await fetch(movie.Poster)
            const blob = await f.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = movie.Title+ " ("-").png"
            a.click()
            setTimeout(()=> {
              URL.revokeObjectURL(url)}, 5000)
          }catch(er) {
            console.log(`err: Download Poster : ${er.message}`)}
        }
        dp()
      }
    }catch(err) {
      console.log(`err: Create Post : ${err.message}`)}
  }