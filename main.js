const API_KEY=[`220f91ed65214e4c99148f77e7370d6c`]
let news=[]

const getLatesNews=async()=>{
    const url=new URL(
        `https://myeongeunnews.netlify.app/v2/top-headlines?country=us&apiKey=${API_KEY}`)
        // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
        const response = await fetch(url)
        const data=await response.json()
        news=data.articles
        console.log("ddd",news)
}

getLatesNews()