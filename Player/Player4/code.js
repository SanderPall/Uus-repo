function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}
let songList = [
	{
		thumbnail:"1..png",
		audio:"1. Dancing Days.mp3",
		songname:"Dancing Days",
		artistname:"Lazy Lewis"
	},
	{
		thumbnail:"2..png",
		audio:"2. Euphoria.mp3",
		songname:"Euphoria",
		artistname:"Charlie Shulz"
	},
	{
		thumbnail:"3..png",
		audio:"3. I know where I'm going.mp3",
		songname:"I know where I'm going",
		artistname:"E66S"
	},
	{
		thumbnail:"4..png",
		audio:"4. See ya....mp3",
		songname:"See ya...",
		artistname:"Chinsaku"
	},
	{
		thumbnail:"5..png",
		audio:"5. Cherry.mp3",
		songname:"Cherry",
		artistname:"altitude."
	},
	{
		thumbnail:"6..png",
		audio:"6. Timeless.mp3",
		songname:"Timeless",
		artistname:"Chinsaku"
	},
	{
		thumbnail:"7..png",
		audio:"7. Flowerz.mp3",
		songname:"Flowerz",
		artistname:"Weirddough"
	},
	{
		thumbnail:"8..png",
		audio:"8. Sweet Soul.mp3",
		songname:"Sweet Soul",
		artistname:"SIM"
	},
	{
		thumbnail:"9..png",
		audio:"9. Piano Loop.mp3",
		songname:"Piano Loop",
		artistname:"Joe Corfield"
	},
	{
		thumbnail:"10..png",
		audio:"10. Time.mp3",
		songname:"Time",
		artistname:"Chinsaku"
	},
	{
		thumbnail:"11..png",
		audio:"11. Forever - brillion..mp3",
		songname:"Forever",
		artistname:"brillion."
	},
	{
		thumbnail:"12..png",
		audio:"12. Tomorrow - Leavv.mp3",
		songname:"Tomorrow",
		artistname:"Leavv"
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