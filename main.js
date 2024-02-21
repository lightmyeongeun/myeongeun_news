const API_KEY=[`220f91ed65214e4c99148f77e7370d6c`]
let newsList=[]


const getLatestNews=async()=>{
    const url=new URL(
        `https://myeongeunnews.netlify.app/top-headlines?country=kr`)
        // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
        const response = await fetch(url)
        const data=await response.json()
        newsList=data.articles
        render()
        console.log("ddd",newsList)
}

getLatestNews()


const render=()=>{
    const newsHTML=newsList.map(news=>`<div class="row news">
    <div class="col-lg-4">
        <img class="news_img_size" src="${news.urlToImage}">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        <div>${news.source.name} * ${news.publishedAt}</div>
    </div>
</div>`).join("")
    document.getElementById("news_board").innerHTML=newsHTML
}

//api키를 통해서 ul보여주기

// function render(){
//     let resultHTML=""
//     let list=[]
//     for(let i=0;i<list.length;i++){
//         resultHTML+=`<div class="row news">
//         <div class="col-lg-4">
//             <img class="news_img_size" src=${list[i].taskContent} alt="">
//         </div>
//         <div class="col-lg-8">
//             <h2>${list[i]taskTittle}</h2>
//             <p>코딩알려주는 누나가 자바스크립트 강의를 오픈했다. 강의가 완판되고 팬미팅도 하게 되었다</p>
//             <div>KBS * 24.02.21</div>
//         </div>
//     </div>`
//     }
// }