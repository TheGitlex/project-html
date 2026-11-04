const prev = document.querySelector('.previous');
const next = document.querySelector('.next');
const fav = document.querySelector('.favorite');
const audio = document.querySelector('#song');
const play = document.querySelector('.play');
const repeat = document.querySelector('.repeat');
const progressBar = document.querySelector('.audio-progress');
const progressContainer = document.querySelector('.audio-control');
const start = document.querySelector('.start');
const end = document.querySelector('.end');
const title = document.querySelector('.title');
const author = document.querySelector('.album-name');

const playlist = [
  { src: "../songs/falcon.mp3", title: "Falcon Stomp", author: "F-777"},
  { src: "../songs/nextsteps.mp3", title: "half.cool", author: "Next Steps" },
  { src: "../songs/football.mp3", title: "Magic In The Air", author: "Magic System" },
  { src: "../songs/aria.mp3", title: "Aria-Math", author: "C418"},
  { src: "../songs/Across the Spider-Verse.mp3", title: "Across The Spider-Verse", author: "Spider-Man"},
  { src: "../songs/Crank That - Soulja Boy.mp3", title: "Crank That", author: "Soulja Boy"},
  { src: "../songs/FWLR - How We Win.mp3", title: "How We Win", author: "FLWR"},
  { src: "../songs/Gusttavo Lima - Balada.mp3", title: "Balada", author: "Gustavo Lima"},
  { src: "../songs/Overwatch - Busan.mp3", title: "Busan", author: "Overwatch"}
];

let currentSongIndex = 0;
audio.volume = 0.4; // Set initial volume to 10%
const loadSong = (index) => {
  audio.src = playlist[index].src;
  title.textContent = playlist[index].title;
  author.textContent = playlist[index].author;
  audio.load();
  resetPlayPause();
}

const resetPlayPause = () => {
  play.querySelector('.pause-btn').classList.add('hide');
  play.querySelector('.play-btn').classList.remove('hide');
}

const togglePlayPause = () => {
  play.querySelector('.pause-btn').classList.toggle('hide');
  play.querySelector('.play-btn').classList.toggle('hide');
}

const togglePressed = (e) => {
  e.srcElement.closest('div').classList.toggle('pressed')
}

window.addEventListener('click', togglePressed, false);
window.addEventListener('mousedown', togglePressed, false);
window.addEventListener('mouseup', togglePressed, false);
window.addEventListener('touchdown', togglePressed, false);
window.addEventListener('touchup', togglePressed, false);

play.addEventListener('click', e => {
  if (audio.paused) {
    togglePlayPause();
    audio.play();
  } else {
    togglePlayPause();
    audio.pause();
  }
});

repeat.addEventListener('click', e => {
  audio.currentTime = 0;
  if (audio.paused) {
    togglePlayPause();
    audio.play();
  }
});

next.addEventListener('click', e => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  audio.play();
  resetPlayPause();
  togglePlayPause();
});

prev.addEventListener('click', e => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  audio.play();
  resetPlayPause();
  togglePlayPause();
});

audio.addEventListener('timeupdate', e => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percent}%`;

  let s = parseInt(audio.currentTime % 60);
  let m = parseInt((audio.currentTime / 60) % 60);
  if (s / 10 < 1) s = '0' + s;
  if (m / 10 < 1) m = '0' + m;

  let es = parseInt(audio.duration % 60);
  let em = parseInt((audio.duration / 60) % 60);
  if (es / 10 < 1) es = '0' + es;
  if (em / 10 < 1) em = '0' + em;

  start.innerHTML = m + ":" + s;
  if (em) {
    end.innerHTML = em + ":" + es;
  }
});

progressContainer.addEventListener('click', e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

window.addEventListener('load', () => {
  loadSong(currentSongIndex);
});

// Load the first song when the page loads
loadSong(currentSongIndex);



function playAudio(audioId) {
  var audio = document.getElementById(audioId);
  if (audio.paused) {
      audio.volume = 0;
      audio.currentTime = 0; // Resetting the audio to start from the beginning
      audio.play();
      var fadeInterval = setInterval(function() {
          if (audio.volume < 0.5) {
              audio.volume += 0.025; // Adjust the increment value as needed for smoother or quicker fade-in
          } else {
              clearInterval(fadeInterval);
          }
      }, 100); 
  }
}

function pauseAudio(audioId) {
  var audio = document.getElementById(audioId);
  audio.pause();
  audio.currentTime = 0; // Resetting the audio to start from the beginning
}


function heartsback(){
  var element = document.getElementById("heartsback");
if (element.style.display === 'none' || element.style.display === '') {
element.style.display = 'inline';
} else {
element.style.display = 'none';
}
}




function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

const colors = ["#2596be","#2187ab","#1e7898","#1a6985","#134b5f","#0f3c4c"];
const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_XLINK = "http://www.w3.org/1999/xlink";

let heartsRy = []

function useTheHeart(n){
  let use = document.createElementNS(SVG_NS, 'use');
  use.n = n;
  use.setAttributeNS(SVG_XLINK, 'xlink:href', '#heart');
  use.setAttributeNS(null, 'transform', `scale(${use.n})`);
  use.setAttributeNS(null, 'fill', colors[n%colors.length]);
  use.setAttributeNS(null, 'x', -69);
  use.setAttributeNS(null, 'y', -69);
  use.setAttributeNS(null, 'width', 138);
  use.setAttributeNS(null, 'height', 138);
  
  heartsRy.push(use)
  hearts.appendChild(use);
}

for(let n = 18; n >= 0; n--){useTheHeart(n)}

function Frame(){
  window.requestAnimationFrame(Frame);
  for(let i = 0; i < heartsRy.length; i++){
    if(heartsRy[i].n < 18){heartsRy[i].n +=.01
     }else{
     heartsRy[i].n = 0;
     hearts.appendChild(heartsRy[i])
    }
    heartsRy[i].setAttributeNS(null, 'transform', `scale(${heartsRy[i].n})`);
  }
}

Frame()