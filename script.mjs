
let searchInput = document.getElementById("searchInput");
// console.log(searchInput.value);
searchInput.value ? fetchDetails(searchInput.value) : fetchDetails('')
searchInput.addEventListener("keyup",()=>{
    let inputValue = searchInput.value.toLowerCase().trim();
       fetchDetails(inputValue);
    })

const videoCategories =  ["Film & Animation","Autos & Vehicles","Music","Pets & Animals","Sports","Gaming","Comedy","Entertainment","News & Politics","Education","Science & Technology","Movies","Anime/Animation","Action/Adventure","Comedy","Drama","Foreign","Horror","Sci-Fi/Fantasy",
     "Thriller","Shows","Trailers"]

function renderCategories(data){
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = item;
        document.querySelector('.container-top').appendChild(div);
    })
}
renderCategories(videoCategories)


document.querySelector('.container-top').addEventListener('click',(e) => {
    const text = e.target.innerText;
 const arr = Array.from(document.querySelectorAll('.item'));
 for(let i = 0; i < arr.length; i++){
    if(arr[i].classList[1] === 'active'){
        arr[i].className = 'item';
        break;
    }
 }
    e.target.classList.add('active')
    // console.log(text);
    fetchDetails(text);
})

const loader = document.createElement('div');
loader.className = 'active-loader';
document.getElementById('container').appendChild(loader);

    async function fetchDetails(search){
        if(search === 'All') search = '';
        const url = `https://youtube-v31.p.rapidapi.com/search?q=${search}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dd739db6e5mshc71142f8f7fbc67p1e48fejsn2254969bf155',
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result.items);
            renderVideos(result.items)
        } catch (error) {
                loader.classList.remove('active-loader');
            console.error(error);
        }
          
    }
fetchDetails('');

    const container = document.getElementById("container");

    function fetchChannel(item){
        localStorage.setItem('channelId',item.snippet.channelId);
        localStorage.setItem('channelName',item.snippet.channelTitle)
         window.location.href = './ChannelPage'
    }

    function videoDetail(item){
        console.log('clicked')
        localStorage.setItem('videoId',item.id.videoId)
        window.location.href = '/videoPage'
    }
    //Rendering videos on UI
     function renderVideos(data){
        container.innerHTML ="";
        data.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<div class="video-card">
        <img  class="video-img" src=${item.snippet.thumbnails.high.url} alt="video-thumbnail"/>
        <div class="video-title">${item.snippet.title.substr(0,50)}...</div>
        <div class="channel-name">${item.snippet.channelTitle}</div>
        </div>`
        loader.classList.remove('active-loader');
        container.appendChild(div); 
        const videoImg = div.querySelector('.video-img');
        videoImg.addEventListener('click',() => videoDetail(item))  
        const videoTitle = div.querySelector('.video-title');
        videoTitle.addEventListener('click',() => videoDetail(item))
        const channel = div.querySelector('.channel-name');
        channel.addEventListener('click',() => fetchChannel(item))
})}
