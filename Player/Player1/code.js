function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}
let songList = [
	{
		thumbnail:"1..png",
		audio:"1. Petit Biscuit - Night Trouble.mp3",
		songname:"Night Trouble",
		artistname:"Petit Biscuit"
	},
	{
		thumbnail:"2..png",
		audio:"2. FROM KID - Colors.mp3",
		songname:"Colors",
		artistname:"From Kid"
	},
	{
		thumbnail:"3..png",
		audio:"3. Tycho - Hours.mp3",
		songname:"Hours",
		artistname:"Tycho"
	},
	{
		thumbnail:"4..png",
		audio:"4. Burial - Archangel.mp3",
		songname:"Archangel",
		artistname:"Burial"
	},
	{
		thumbnail:"5..png",
		audio:"5. Planet Caravan - Black Sabbath.mp3",
		songname:"Planet Caravan",
		artistname:"Black Sabbath"
	},
	{
		thumbnail:"6..png",
		audio:"6. Ross From Friends - Talk To Me You'll Understand.mp3",
		songname:"Talk To Me You'll Understand",
		artistname:"Ross From Friends"
	},
	{
		thumbnail:"7..png",
		audio:"7. Joey Bada$$ - Love Is Only A Feeling.mp3",
		songname:"Love Is Only A Feeling",
		artistname:"Joey Bada$$"
	},
	{
		thumbnail:"8..png",
		audio:"8. Sade - Lover's Rock.mp3",
		songname:"Lover's Rock",
		artistname:"Sade"
	},
	{
		thumbnail:"9..png",
		audio:"9. BADBADNOTGOOD - Time Moves Slow.mp3",
		songname:"Time Moves Slow",
		artistname:"BADBADNOTGOOD"
	},
	{
		thumbnail:"10..png",
		audio:"10. Garden - Wilsen.mp3",
		songname:"Wilsen",
		artistname:"Garden"
	},
];
//Siin on meil muusika list, kus esimene rida - pilt,teine - fail, kolmas - loo nimetus, neljas - loo artist//

let currentSongIndex = 0;
//Millega lauluga alustame//

let player = _(".player"),
	toggleSongList = _(" .toggle-list");
//Siin määrame player,et tulevikus oleks mugavam//

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
//Kasutame eelmisest osas player ja anname funktsionaalsus , näiteks nuppud, laulude nimetused - mis kus asub//

toggleSongList.addEventListener("click", function(){
	toggleSongList.classList.toggle("active");
	classList.toggle("activeSongList");
});
//Anname funktsiooni siis kui vajutakse selle peale//

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
//Siis määratakse klassidele kust võtta infot nagu laulja ja loo nimetus//

let songListItems = _all(".player-list .list .item");
for(let i=0;i<songListItems.length;i++){
	songListItems[i].addEventListener("click",function(){
		currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
		loadSong(currentSongIndex);
		player.classList.remove("activeSongList");
	});
}
//Antakse funktsiooni kui klikitakse playlistis mingi loo peale//

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
//Siin on muusika laadimis protsess ja samuti ka tagaplaani määramine//

setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);
//Laulu näidik , kui palju sellest on mängitud//

main.prevControl.addEventListener("click",function(){
	currentSongIndex--;
	if(currentSongIndex < 0){
		currentSongIndex = songList.length + currentSongIndex;
	}
	loadSong(currentSongIndex);
});
//Eelmise laula valik//

main.nextControl.addEventListener("click",function(){
	currentSongIndex = (currentSongIndex+1) % songList.length;
	loadSong(currentSongIndex);
});
//Järgmise laula valik//

main.playPauseControl.addEventListener("click",function(){
	if(main.audio.paused){
		main.playPauseControl.classList.remove("paused");
		main.audio.play();
	} else {
		main.playPauseControl.classList.add("paused");
		main.audio.pause();
	}
});
// pause ja play vahetus ja samuti mõjutus loole//

main.seekbar.addEventListener("change",function(){
	main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);
//Võimalus valida laulu osa//