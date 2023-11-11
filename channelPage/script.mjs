document.querySelector('.go-home').addEventListener('click',() => {
	window.location.href = '/';
 })
document.title = localStorage.getItem('channelName')
document.querySelector('.heading').innerText = `${document.title} Videos`
function renderChannel(data){
    document.querySelector('.channel-box').innerHTML = `
	<div>
	   <div class='banner-img'>
	    <img src=${data.brandingSettings.image.bannerExternalUrl} alt='${data.snippet.title}-banner-img'/>
	   </div>
	   <div class='channel-detail'>
	   <img src=${data.snippet.thumbnails.high.url} alt='${data.snippet.title}-img'/>
        <div>
		<h3>${data.snippet.title}</h3>
		<p>${data.snippet.description}</p>
		<span>${data.statistics.subscriberCount} Subscribers</span>
		<span>${data.statistics.videoCount} Videos</span>
		</div>
	   </div>
	</div>`
}

async function fetchChannelData(){
    const url = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${localStorage.getItem('channelId')}`;
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
	// console.log(result.items[0]);
	renderChannel(result.items[0])
} catch (error) {
	console.error(error);
}
}
fetchChannelData();

const container = document.querySelector('.channel-videos')

function renderVideos(data){
    container.innerHTML ='';
    data.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<div class="video-card">
        <img  class="video-img" src=${item.snippet.thumbnails.high.url} alt="video-thumbnail"/>
        <div class="video-title">${item.snippet.title}</div>
        <div class="channel-name">${item.snippet.channelTitle}</div>
        <div class="video-views"></div>
        <div class="published-time"></div>
        </div>`
        container.appendChild(div); 
        const videoImg = div.querySelector('.video-img');
        videoImg.addEventListener('click',() => videoDetail(item))  
        const videoTitle = div.querySelector('.video-title');
        videoTitle.addEventListener('click',() => videoDetail(item))
        const channel = div.querySelector('.channel-name');
        channel.addEventListener('click',() => fetchChannel(item))
})
    }

async function fetchChannelVideos(){
	const url = `https://youtube-v31.p.rapidapi.com/search?channelId=${localStorage.getItem('channelId')}&part=snippet%2Cid&order=date&maxResults=50`;
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
		renderVideos(result.items);
	} catch (error) {
		console.error(error);
	}
}
fetchChannelVideos();