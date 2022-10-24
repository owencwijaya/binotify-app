const player = document.getElementById("player");
const footer_btn_play = document.getElementById("footer-btn-play");
const seek_bar = document.getElementById("seek-bar");
const volume_bar = document.getElementById("volume-bar");
const current_time = document.getElementById("current-time");
const mute_btn = document.getElementById("mute");
const loop_btn = document.getElementById("loop");
let raf = null;

const play_and_pause = () => {
  const btn_play = document.getElementById("btn-play");
  const footer_container = document.getElementById("footer-container");
  if (player.paused) {
    footer_container.classList.remove("hidden");
    player.play();
    requestAnimationFrame(whilePlaying);
    btn_play.innerHTML = `
            <p class="btn-play-text text-white font-bold">Pause</p>
            <img src="assets/icons/pause.png" alt="pause" class="btn-play-img" />
        `;
    footer_btn_play.innerHTML = `<img src="assets/icons/pause.png" alt="pause" />`;
  } else {
    player.pause();
    cancelAnimationFrame(raf);
    btn_play.innerHTML = `
            <p class="btn-play-text text-white font-bold">Play</p>
            <img src="assets/icons/play.png" alt="play" class="btn-play-img" />
        `;
    footer_btn_play.innerHTML = `<img src="assets/icons/play.png" alt="play" />`;
  }
};

const mute = () => {
  if (player.muted) {
    player.muted = false;
    mute_btn.innerHTML = `<img src="assets/icons/sound.png" alt="unmute" />`;
  } else {
    player.muted = true;
    mute_btn.innerHTML = `<img src="assets/icons/mute.png" alt="mute" />`;
  }
};

const loop = () => {
  if (player.loop) {
    player.loop = false;
    loop_btn.innerHTML = `<img src="assets/icons/repeat.png" alt="loop" />`;
  } else {
    player.loop = true;
    loop_btn.innerHTML = `<img src="assets/icons/repeat_one.png" alt="loop" />`;
  }
};

const calculateTime = (secs) => {
  let minutes = Math.floor(secs / 60);
  let seconds = Math.floor(secs % 60);
  return `${minutes < 10 ? `0${minutes}` : `${minutes}`}:${
    seconds < 10 ? `0${seconds}` : `${seconds}`
  }`;
};

const displayDuration = () => {
  current_time.textContent = calculateTime(player.currentTime);
};

const setSliderMax = () => {
  seek_bar.max = player.duration;
};

const whilePlaying = () => {
  seek_bar.value = player.currentTime;
  current_time.textContent = calculateTime(player.currentTime);
  player;
  raf = requestAnimationFrame(whilePlaying);
};

if (player.readyState > 0) {
  displayDuration();
  setSliderMax();
} else {
  player.addEventListener("loadedmetadata", () => {
    displayDuration();
    setSliderMax();
  });
}

seek_bar.addEventListener("input", () => {
  current_time.textContent = calculateTime(seek_bar.value);
  if (!player.paused) {
    cancelAnimationFrame(raf);
  }
});

seek_bar.addEventListener("change", () => {
  player.currentTime = seek_bar.value;
  if (!player.paused) {
    requestAnimationFrame(whilePlaying);
  }
});

volume_bar.addEventListener("input", () => {
  player.volume = volume_bar.value / 100;
});
