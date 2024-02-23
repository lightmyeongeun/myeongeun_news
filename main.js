const API_KEY=[`220f91ed65214e4c99148f77e7370d6c`]
let newsList=[]
let url=new URL(`https://myeongeunnews.netlify.app/top-headlines?country=kr`)
// `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

const newsData=async()=>{
    try{
        const response = await fetch(url)
        const data=await response.json()
        if(response.status==200){//api 값이 200(정상)이 아닐때 에러메세지
            if(data.articles.length===0){
                throw new Error("No result for this search")
            }//검색어 일치 아닐때 에러메세지 => 이게 아니면 다시 흘러감
            newsList=data.articles
            render()
        }else{
            throw new Error(data,message)
        }
    }catch(error){
        errorRender(error.message)
    }
}

const errorRender=(errorMessage)=>{
    const errorHTML=`<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>
    <div class="alert alert-danger d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
        <use xlink:href="#exclamation-triangle-fill"/>
    </svg>
    <div>
    ${errorMessage}
    </div>
  </div>`    
    document.getElementById("news_board").innerHTML=errorHTML
}

const getLatestNews=async()=>{
    url=new URL(`https://myeongeunnews.netlify.app/top-headlines?country=kr`)
    newsData()
}

getLatestNews()//api 불러오기

const render=()=>{
    const newsHTML=newsList.map(news=>`<div class="row news">
    <div class="col-lg-4">
        <img class="news_img_size" src="${news.urlToImage}" onerror="imgError(this)">
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

//빈 이미지 함수
const imgError=(image)=>{
    image.onerror=null;
    image.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
}

//카테고리 - 1. 버튼틀에 클릭이벤트 주기
const menus=document.querySelectorAll(".menus button")//여러개 한꺼번에 가져오기
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

//카테고리 - 2. 카테고리별 뉴스 가져오기
const getNewsByCategory=async(event)=>{
    const category=event.target.textContent.toLowerCase()//소문자 간단하게 바꾸기!-ul 안건들고
    url=new URL(`https://myeongeunnews.netlify.app/top-headlines?country=kr&category=${category}`)
    //api키는 맨 마지막이 좋음!

    newsData()
    //카테고리 - 3. 그 뉴스를 보여주기 render()
}

//키워드 - 1. input 부분 값을 가져오기
const searchKeywords=async()=>{
    const keywords=document.getElementById("search_input").value
    url=new URL(`https://myeongeunnews.netlify.app/top-headlines?country=kr&q=${keywords}`)
    //키워드 - 2. 
    newsData()
}

//키워드 - enter키
input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      searchKeywords(event);
    }
});
