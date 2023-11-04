const apiKey = "AIzaSyBxo8JwdPalNYmabeOeeF5lW3YdfwcPtM8";

let searchInput = document.getElementById("searchInput");
// console.log(searchInput.value);
searchInput.value ? fetchDetails(searchInput.value) : fetchDetails('')
searchInput.addEventListener("keyup",()=>{
    let inputValue = searchInput.value.toLowerCase().trim();
       fetchDetails(inputValue);
    })

    async function fetchDetails(search){
        const endpoint = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${search}&part=snippet&type=video&maxResults=100`;
        const response = await fetch(endpoint,{method : "GET"});
        const result = await response.json();
        console.log(result)
          renderVideos(result.items);
          
    }

    const container = document.getElementById("container");

    //Rendering videos on UI
    function renderVideos(data){
    container.innerHTML ="";
    data.forEach((item) => {
        const videoLink = document.createElement("a");
        videoLink.href = "./videoDetails.html"
        videoLink.addEventListener("click",()=>{
            localStorage.setItem("videoId",`${item.id.videoId}`)
        })
        videoLink.innerHTML = `<div class="video-card">
        <img class="video-img" src=${item.snippet.thumbnails.high.url} alt="video-thumbnail"/>
        <div class="video-title">${item.snippet.title}</div>
        <div class="channel-name">${item.snippet.channelTitle}</div>
        <div class="video-views"></div>
        <div class="published-time"></div>
        </div>`
        container.appendChild(videoLink);
    });
}


// fetchDetails();