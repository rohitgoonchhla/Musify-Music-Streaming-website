console.log("Welcome to Musify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('/app/static/audio/Bones.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Attention - Charlie Puth", filePath: "/static/audio/Attention.mp3", coverPath: "/static/images/Attention.jpg"},
    {songName: "Blinding Lights - The Weekend", filePath: "/static/audio/Blinding Lights.mp3", coverPath: "/static/images/Blinding_Lights.jpg"},
    {songName: "Closer - Chainsmokers", filePath: "/static/audio/Closer.mp3", coverPath: "/static/images/Closer.jpg"},
    {songName: "Sober - G-Eazy ft. Charlie Puth", filePath: "/static/audio/Sober.mp3", coverPath: "/static/images/sober.jpg"},
    {songName: "Harleys in Hawaii - Katy Perry", filePath: "/static/audio/Harleys_In_Hawaii.mp3", coverPath: "/static/images/Harleys_in_Hawaii.jpg"},
    {songName: "Bones - Imagine Dragons", filePath: "/static/audio/Bones.mp3", coverPath: "/static/images/Bones.jpg"},
    {songName: "Back to You - Louis Tomilson ft. Bebe Rexha", filePath: "/static/audio/Back_to_you.mp3", coverPath: "/static/images/back to you.jpg"},
    {songName: "Animals - Martin Garrix", filePath: "/static/audio/Animals.mp3", coverPath: "/static/images/Animals.jpg"},
    {songName: "Stereo Hearts ft. Adam Levine", filePath: "/static/audio/Stereo_Hearts", coverPath: "/static/images/stereo.jpg"},
    {songName: "Watermelon Sugar - Harry Styles", filePath: "/static/audio/Watermelon_Sugar", coverPath: "/static/images/Watermelon_sugar.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})