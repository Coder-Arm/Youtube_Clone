document.querySelector('.go-home').addEventListener('click',() => {
   window.location.href = '/';
})
const video = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");
video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

const videoInfo = document.getElementById("video-info"); 

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'dd739db6e5mshc71142f8f7fbc67p1e48fejsn2254969bf155',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchVideoDetails(){
    const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${localStorage.getItem('videoId')}`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result.items[0]);
        renderData(result.items[0])
    } catch (error) {
        console.error(error);
    }
}
fetchVideoDetails();

function renderData(item){
    console.log(item)
        const titleWithStats = document.createElement("div");
        titleWithStats.className = "title-with-stats";
        titleWithStats.innerHTML = `
        <div class="video-title">${item.snippet.title}</div>
        <div class="statistics">
        <span class="views">${item.statistics.viewCount} views</span>
        <div class="right">
        <div class="item">
        <img src="../statistics/Liked.png" alt="">
        <span>${item.statistics.likeCount??'Not found' }</span>
        </div>
        <div class="item">
        <img src="../statistics/Share.png" alt="share"><span>Share</span>
        </div>
        <div class="item">
        <img src="../statistics/save.png" alt="save"><span>Save</span>
        </div>
        </div>
        </div>`
        const channel = document.createElement("div");
        channel.className = "channel"
        channel.innerHTML=`<div class="channel-top">
        <div  class="channel-name">${item.snippet.channelTitle}</div>
        <button class="subscribe">Subscribe</button>
         </div>
         <div class="description">${item.snippet.description.substr(0,300)}</div>
         `
        videoInfo.append(titleWithStats,channel);
        const channelName = channel.querySelector('.channel-name');
    channelName.addEventListener('click',() => fetchChannel(item))
}
   //Fetching onclicked video

 
  const commentsContainer = document.createElement("div");
  commentsContainer.className = "commentsBox"
  
  async function fetchComments(){
    const url = 'https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=7ghhRHRP6t4&maxResults=100';
   
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        addComments(result.items)
    } catch (error) {
        console.error(error);
    }
  }
  fetchComments();

 function addComments(data){
    commentsContainer.innerHTML = `<div class="comments-top"><span>${data.length} </span>Comments</div>`
    data.forEach(item => {
        commentsContainer.innerHTML += `<div class="comment-item"><img src= ${item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="profile-img"><div><p class="comment">${item.snippet.topLevelComment.snippet.textDisplay}</p>
        <div class ="comment-bottom">
        <img src="../statistics/Liked.png">
        <img src = "../statistics/Button-Btn.png">
        <button>Reply</button>
        </div>
        </div>
        </div>`
    });
    videoInfo.appendChild(commentsContainer);
 }

async function fetchSideVideos(){
    const url = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${videoId}&part=id%2Csnippet&type=video&maxResults=20`;
try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
    getVideos(result.items)
} catch (error) {
	console.error(error);
}
}
fetchSideVideos();

function fetchChannel(item){
    localStorage.setItem('channelId',item.snippet.channelId);
    localStorage.setItem('channelName',item.snippet.channelTitle)
     window.location.href = '/ChannelPage'
}
function videoDetail(item){
    console.log('clicked')
    localStorage.setItem('videoId',item.id.videoId)
    window.location.href = '/videoPage'
}

const sideVideos = document.getElementById("side-videos");
function getVideos(data){
    // console.log(data)
    data.forEach(item => {
         const videoCard = document.createElement("div");
         videoCard.className = "video-card";
         videoCard.innerHTML = `
         <img class='video-img' src=${item.snippet.thumbnails?.medium?.url} alt="something" />
        <div class="about-video">
           <div class="title video-title">${item.snippet.title.substr(0,50)}...</div>
           <div class="channel-name">${item.snippet.channelTitle}</div>
        </div>`
           sideVideos.appendChild(videoCard);
           const videoImg = videoCard.querySelector('.video-img');
    videoImg.addEventListener('click',() => videoDetail(item))  
    const videoTitle = videoCard.querySelector('.video-title');
    videoTitle.addEventListener('click',() => videoDetail(item))
    const channel = videoCard.querySelector('.channel-name');
    channel.addEventListener('click',() => fetchChannel(item))
    })
}
