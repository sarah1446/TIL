// Get our Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

console.dir(video);

// Build out functionis
function togglePlay(){
    const method = video.paused? 'play' : 'pause';
    //example -> video[menthName]();
    video[method]();

    // if(video.paused){
    //     video.play();
    // }else{
    //     video.pause()
    // }
}

function updateButton(){
    const icon = this.paused ? '▶' : '▣';
    //console에다가 video.pause(); 하면 멈춤, 여기선 .paused? 
    toggle.textContent = icon;
}

function skip() {
    //console.log(this.dataset); // DOMStringMap{skip : "25"}
    //console.log(this.dataset.skip); // 25
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration)*100; //100곱해서 0.5가 아니라 50%으로 나옴
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; //(현재막대길이/전체막대길이)*596.5// video.duration이 뭐야
    //progress.offsetWidth는 640 .. video.duration은 600이 안되고 뭐지
    video.currentTime = scrubTime;
    // console.dir(video);
}

// Hook up theh event listener
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //mousemove하면 mousedown이 false라서 작동 무조건 안되게 하는건가? 없어도 될거같은..이벤트
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//아래 두개만 해도 작동하는데 굳이 플래그변수 써서 이벤트 두개를 왜 추가하지?
// progress.addEventListener('click',scrub);
// progress.addEventListener('mousedown', scrub);
