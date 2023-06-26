const Player = document.querySelector('.player')
const BtnPlay = document.querySelector('.btn-play')
const BtnPrev = document.querySelector('.btn-prev')
const BtnNext = document.querySelector('.btn-next')
const nameSong = document.querySelector('.songs')
const audio = document.querySelector('.audio')
const PanelLine = document.querySelector('.panel-line')
const Panel = document.querySelector('.panel')
const Images = document.querySelector('.img')
const Pause = document.querySelector('.pause')

// events

// names
const songs = ['Away', 'Naruto', 'DBSS']

// default song
let songIndex = 0

// init
function loadSong(song){
    nameSong.innerHTML = song
    audio.src = `audio/${song}.mp3`
    Images.src = `img/img${songIndex + 1}.svg`
}
loadSong(songs[songIndex])

// play
function playSong(){
    Player.classList.add('play')
    Images.classList.add('active')
    Pause.src = './webfonts/pause.svg'
    audio.play()
}
// pause
function pauseSong(){
    Player.classList.remove('play')
    Images.classList.remove('active')
    Pause.src = './webfonts/play.svg'
    audio.pause()
}

BtnPlay.addEventListener('click', () => {
    const isPlay  = Player.classList.contains('play')
    if(isPlay){
        pauseSong()
    }
    else{
        playSong()
    }
})
PanelLine.addEventListener('click', () => playSong())
// next song
function nextSong(){
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
BtnNext.addEventListener('click', nextSong)

// prev song
function prevSong(){
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
BtnPrev.addEventListener('click', prevSong)

// Panel Line
function timeUpdate(event){
    const {duration, currentTime} = event.srcElement
    const linePercent = (currentTime / duration) * 100
    Panel.style.width = `${linePercent}%`
}
audio.addEventListener('timeupdate', timeUpdate)

// Set Line
function setUpdate(event){
    const width = this.clientWidth
    const click = event.offsetX
    const duration = audio.duration

    audio.currentTime = (click / width) * duration
}
PanelLine.addEventListener('click', setUpdate)
audio.addEventListener('ended', nextSong)