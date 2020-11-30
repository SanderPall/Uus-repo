function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}
let songList = [
	{
		thumbnail:"1..png",
		audio:"1. Nightrider - Tom Misch & Yussef Dayes.mp3",
		songname:"Nightrider",
		artistname:"Tom Misch & Yussef Dayes"
	},
	{
		thumbnail:"2..png",
		audio:"2. Sleepless - Degs.mp3",
		songname:"Sleepless",
		artistname:"Degs"
	},
	{
		thumbnail:"3..png",
		audio:"3. Niko The Kid - Infectious.mp3",
		songname:"Infectious",
		artistname:"Niko The Kid"
	},
	{
		thumbnail:"4..png",
		audio:"4. Britney Spears - Toxic.mp3",
		songname:"Toxic",
		artistname:"Britney Spears"
	},
	{
		thumbnail:"5..png",
		audio:"5. In My Room.mp3",
		songname:"In My Room",
		artistname:"Frank Ocean"
	},
	{
		thumbnail:"6..png",
		audio:"6. Khruangbin - Christmas Time Is Here.mp3",
		songname:"Christmas Time Is Here",
		artistname:"Khruangbin"
	},
	{
		thumbnail:"7..png",
		audio:"7. Soulstance - The Time.mp3",
		songname:"The Time",
		artistname:"Soulstance"
	},
	{
		thumbnail:"8..png",
		audio:"8. Maya Jane Coles - Bo & Wing.mp3",
		songname:"Bo & Wing",
		artistname:"Maya Jane Coles"
	},
	{
		thumbnail:"9..png",
		audio:"9. Dj Koze - Pick Up.mp3",
		songname:"Pick Up",
		artistname:"Dj Koze"
	},
	{
		thumbnail:"10..png",
		audio:"10. Must Be Deep.mp3",
		songname:"Must Be Deep",
		artistname:"Hugo Mari"
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
	document.body.style.background = `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("./files/gif.gif") center no-repeat`;
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