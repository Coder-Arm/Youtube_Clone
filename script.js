
let searchInput = document.getElementById("searchInput");

const apiKey = "AIzaSyBxo8JwdPalNYmabeOeeF5lW3YdfwcPtM8";
const endpoint = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchInput.value}&part=snippet&type=video&maxResults=100`;

const container = document.getElementById("container");
function renderVideos(data){
    container.innerHTML ="";
    data.forEach((item) => {
        const videoLink = document.createElement("a");
        videoLink.href = "./videoDetails.html"
        videoLink.addEventListener("click",()=>{
            localStorage.setItem("videoId",`${item.id.videoId}`)
        })
        videoLink.innerHTML = `<div class="video-card">
        <div class="video-img"><img src=${item.snippet.thumbnails.high.url} alt="video-thumbnail"></div>
        <div class="video-title">${item.snippet.title}</div>
        <div class="channel-name">${item.snippet.channelTitle}</div>
        <div class="video-views"></div>
        <div class="published-time"></div>
        </div>`
        container.appendChild(videoLink);
    });
}


async function fetchDetails(){
    const response = await fetch(endpoint,{method : "GET"});
    const result = await response.json();
    // console.log(result);
      searchInput.addEventListener("keyup",()=>{
        let inputValue = searchInput.value.toLowerCase().trim();
       let filteredData =  result.items.filter(item => {
           return (item.snippet.title.toLowerCase().includes(inputValue))
        })
        // console.log(filteredData);
        renderVideos(filteredData);
      })
      renderVideos(result.items);
}
fetchDetails();