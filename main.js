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

getLatestNews()//api 불러오기


const render=()=>{
    const newsHTML=newsList.map(news=>`<div class="row news">
    <div class="col-lg-4">
        <img class="news_img_size" src="${news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
    }" />
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description==null || news.description==""
        ? "내용없음"
        : news.description.length > 200
        ? news.description.substring(0,200)+"..."
        : news.description}</p>
        <div>${news.source.name || "no source"} ${moment(news.publishedAt).startOf('day').fromNow()}</div>
    </div>
</div>`).join("")
    document.getElementById("news_board").innerHTML=newsHTML
} 
// UI에 뉴스 불러오기
//news.description 삼항연산식 *
//img 추가 *
//cdn으로 시간 설정하기! moment().startOf('day'). fromNow()
let input = document.querySelector(".search_area");
let btn = document.querySelector(".search_btn");
let parent = document.querySelector(".search");

btn.addEventListener("click", () => {
    parent.classList.toggle("active");
});//검색창 띄우기

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}; 
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}; // 반응형 사이드 - 복습 필요!!*

