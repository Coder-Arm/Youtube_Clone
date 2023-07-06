const video = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");
video.src = `https://www.youtube.com/embed/${videoId}`;
const apiKey = "AIzaSyBxo8JwdPalNYmabeOeeF5lW3YdfwcPtM8";
const endpoint1 = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}
`
const videoInfo = document.getElementById("video-info"); 
function renderData(item){
        const titleWithStats = document.createElement("div");
        titleWithStats.className = "title-with-stats";
        titleWithStats.innerHTML = `
        <div class="video-title">${item.snippet.title}</div>
        <div class="statistics">
        <span class="views">${item.statistics.viewCount} views</span>
        <div class="right">
        <div class="item"><img src="./statistics/Liked.png" alt=""><span>${item.statistics.likeCount}</span></div>
        <div class="item">
        <img src="./statistics/Share.png" alt="share"><span>Share</span></div>
        <div class="item">
        <img src="./statistics/save.png" alt="save"><span>Save</span></div></div></div>`
        const channel = document.createElement("div");
        channel.className = "channel"
        channel.innerHTML=`<div class="channel-top">
        <div class="channel-name">${item.snippet.channelTitle
        }</div><button class="subscribe">Subscribe</button>
         </div>
         <div class="description">${item.snippet.description.substr(0,300)}</div>
         `
        //  const replyBtn = document.createElement("button");
        //  replyBtn.innerText = "Show Replies"
        //  replyBtn.onclick = fetchComments();
        videoInfo.append(titleWithStats,channel);

}
   
async function fetchVideoDetails(){
    const response = await fetch(endpoint1);
    const result = await response.json();
    // console.log(result.items[0])
    renderData(result.items[0]);
}
fetchVideoDetails();
 
const endpoint2 = `https://www.googleapis.com/youtube/v3/commentThreads
?key=${apiKey}&part=snippet&videoId=${videoId}&maxResults=80&order=time`;
  const commentsContainer = document.createElement("div");
  commentsContainer.className = "commentsBox"
  
 function addComments(data){
    commentsContainer.innerHTML = `<div cla ss="comments-top"><span>${data.length} </span>Comments</div>`
    data.forEach(item => {
        commentsContainer.innerHTML += `<div class="comment-item"><img src= ${item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="profile-img"><div><p class="comment">${item.snippet.topLevelComment.snippet.textDisplay}</p>
        <div class ="comment-bottom">
        <img src="./statistics/Liked.png">
        <img src = "./statistics/Button-Btn.png">
        <button>Reply</button>
        </div>
        </div>
        </div>`
    });
    videoInfo.appendChild(commentsContainer);
 }

async function fetchComments(){
  const response = await fetch(endpoint2);
  const result = await response.json();
   console.log(result.items);
    addComments(result.items);
}
fetchComments();

const searchStr = "";
const endpoint3 = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchStr}&part=snippet&type=video&maxResults=10` 
async function fetchVideos(){
    const response = await fetch(endpoint3);
    const result = await response.json();
    // console.log(result.items);
    getVideos(result.items);
}
fetchVideos();

const sideVideos = document.getElementById("side-videos");
function getVideos(data){
    data.forEach(item => {
         const videoCard = document.createElement("div");
         videoCard.className = "video-card";
         videoCard.addEventListener("click",()=>{
            localStorage.setItem("videoId",item.id.videoId);
            window.open("https://coder-arm.github.io/Youtube_Clone/videoDetails.html");
            video.src = `https://www.youtube.com/embed/${videoId}`;
         })
         videoCard.innerHTML = `
         <img src=${item.snippet.thumbnails.high.url} alt="something" />
        <div class="about-video">
           <div class="title">${item.snippet.title}</div>
           <div class="channel-name">${item.snippet.channelTitle}</div>
        </div>`
           sideVideos.appendChild(videoCard);
    })
}
