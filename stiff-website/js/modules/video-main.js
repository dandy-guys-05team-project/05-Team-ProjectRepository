export function mainPlay() {

     
     const video = document.querySelector('.hero-video video');
const playBtn = document.querySelector('.hero-video .play');

let firstClick = true;
let userPlayedWithSound = false;

// Initial play button
playBtn.style.display = 'block';

// Function to play video with sound (user click)
async function playWithSound() {
  video.currentTime = 0;
  video.muted = false;
  try { await video.play(); } catch(e) {}
  playBtn.style.display = 'none';
  firstClick = false;
  userPlayedWithSound = true;
}

// Play button click
playBtn.addEventListener('click', () => {
  if (firstClick) {
    playWithSound();
  } else {
    video.muted = userPlayedWithSound ? false : true;
    video.play();
    playBtn.style.display = 'none';
  }
});

// Click video to toggle pause/play
video.addEventListener('click', () => {
  if (firstClick) {
    playWithSound();
  } else if (video.paused) {
    video.muted = userPlayedWithSound ? false : true;
    video.play();
    playBtn.style.display = 'none';
  } else {
    video.pause();
    playBtn.style.display = 'block';
  }
});

// IntersectionObserver to resume muted autoplay when scrolling back
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!userPlayedWithSound) { // only if user never clicked
      if (entry.isIntersecting) {
        if (video.paused) {
          video.muted = true;
          video.play();
          playBtn.style.display = 'none';
        }
      } else {
        if (!video.paused) {
          video.pause();
          playBtn.style.display = 'block';
        }
      }
    }
  });
}, { threshold: 0.5 }); // trigger when 50% visible

observer.observe(video);


}