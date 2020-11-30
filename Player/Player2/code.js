function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}
let songList = [
	{
		thumbnail:"1..png",
		audio:"1. Temptress - Lies (Ross From Friends Remix).mp3",
		songname:"Lies",
		artistname:"Temptress, Ross From Friends"
	},
	{
		thumbnail:"2..png",
		audio:"2. Mall Grab - Orange County.mp3",
		songname:"Orange County",
		artistname:"Mall Grab"
	},
	{
		thumbnail:"3..png",
		audio:"3. JVXTA - Suzuku Dream.mp3",
		songname:"Suzuku Dream",
		artistname:"JVXTA"
	},
	{
		thumbnail:"4..png",
		audio:"4. Bigger Than Prince - Green Velvet.mp3",
		songname:"Bigger Than Prince",
		artistname:"Green Velvet (Hot Since 82 Remix)"
	},
	{
		thumbnail:"5..png",
		audio:"5. Talk To Me.mp3",
		songname:"Talk To Me",
		artistname:"Colour Castle"
	},
	{
		thumbnail:"6..png",
		audio:"6. Chris Lake feat Alexis Roberts - Turn Off The Lights.mp3",
		songname:"Turn Off The Lights",
		artistname:"Chris Lake (feat. Alexis Roberts)"
	},
	{
		thumbnail:"7..png",
		audio:"7. Dombresky - Simple Hit.mp3",
		songname:"Simple Hit",
		artistname:"Dombresky"
	},
	{
		thumbnail:"8..png",
		audio:"8. Moksi - Gipsy (Feat. Haj).mp3",
		songname:"Gipsy (feat. Haj)",
		artistname:"Moksi"
	},
	{
		thumbnail:"9..png",
		audio:"9. Shy FX - Too Shy feat. Sinead Harnett (Breakage remix).mp3",
		songname:"Too Shy (feat. Sinead Harnett)",
		artistname:"Shy FX (Breakage remix)"
	},
	{
		thumbnail:"10..png",
		audio:"10. Mario High (Original Mix).mp3",
		songname:"Mario High",
		artistname:"Future Class, Rivas"
	},

];

let currentSongIndex = 0;

let player = _(".player"),
	toggleSongList = _(" .toggle-list");

let main = {
	audio:_(".player .main audio"),
	thumbnail:_(".player .main img"),
	seekbar:_(".player .main input"),
	songname:_(".player .main .details h2"),
	artistname:_(".player .main .details p"),
	prevControl:_(".player .main .controls .prev-control"),
	playPauseControl:_(".player .main .controls .play-pause-control"),
	nextControl:_(".player .main .controls .next-control")
}

toggleSongList.addEventListener("click", function(){
	toggleSongList.classList.toggle("active");
	classList.toggle("activeSongList");
});

_(".player-list .list").innerHTML = (songList.map(function(song,songIndex){
	return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="./files/${song.thumbnail}">
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
}).join(""));

let songListItems = _all(".player-list .list .item");
for(let i=0;i<songListItems.length;i++){
	songListItems[i].addEventListener("click",function(){
		currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
		loadSong(currentSongIndex);
		player.classList.remove("activeSongList");
	});
}

function loadSong(songIndex){
	let song = songList[songIndex];
	main.thumbnail.setAttribute("src","./files/"+song.thumbnail);
	document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("./files/gif.gif") center no-repeat`;
	document.body.style.backgroundSize = "cover";	
	main.songname.innerText = song.songname;
	main.artistname.innerText = song.artistname;
	main.audio.setAttribute("src","./files/"+song.audio);
	main.seekbar.setAttribute("value",0);
	main.seekbar.setAttribute("min",0);
	main.seekbar.setAttribute("max",0);
	main.audio.addEventListener("canplay",function(){
		main.audio.play();
		if(!main.audio.paused){
			main.playPauseControl.classList.remove("paused");
		}
		main.seekbar.setAttribute("max",parseInt(main.audio.duration));
		main.audio.onended = function(){
			main.nextControl.click();
		}
	})
}
setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);

main.prevControl.addEventListener("click",function(){
	currentSongIndex--;
	if(currentSongIndex < 0){
		currentSongIndex = songList.length + currentSongIndex;
	}
	loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click",function(){
	currentSongIndex = (currentSongIndex+1) % songList.length;
	loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click",function(){
	if(main.audio.paused){
		main.playPauseControl.classList.remove("paused");
		main.audio.play();
	} else {
		main.playPauseControl.classList.add("paused");
		main.audio.pause();
	}
});
main.seekbar.addEventListener("change",function(){
	main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);