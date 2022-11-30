const player =document.getElementById("player");
const footer_btn_play = document.getElementById("footer-btn-play");
const seek_bar = document.getElementById("seek-bar");
const volume_bar = document.getElementById("volume-bar");
const current_time = document.getElementById("current-time");
const mute_btn = document.getElementById("mute");
const loop_btn = document.getElementById("loop");
let raf = null;

const play_and_pause_premium = (index) => {
  const btn_play = document.getElementsByClassName("play-btn-small")[index];
  const footer_container = document.getElementById("footer-container");
  if (player.paused) {
    footer_container.classList.remove("hidden");
    player.play();
    requestAnimationFrame(whilePlaying);
    btn_play.innerHTML = `
          <img src="assets/icons/pause.png" alt="pause" class="play-btn-small-icon" />
        `;
    footer_btn_play.src = "assets/icons/pause.png";
  } else {
    player.pause();
    cancelAnimationFrame(raf);
    btn_play.innerHTML = `
          <img src="assets/icons/play.png" alt="play" class="play-btn-small-icon" />
        `;
    footer_btn_play.src = "assets/icons/play.png";
  }
}

const play_and_pause = () => {
  const btn_play = document.getElementById("btn-play");
  const footer_container = document.getElementById("footer-container");
  if (player.paused) {
    footer_container.classList.remove("hidden");
    player.play();
    requestAnimationFrame(whilePlaying);
    btn_play.innerHTML = `
            <p class="song-btn-text text-white font-bold">Pause</p>
            <img src="assets/icons/pause.png" alt="pause" class="song-btn-img" />
        `;
    footer_btn_play.src = "assets/icons/pause.png";
  } else {
    player.pause();
    cancelAnimationFrame(raf);
    btn_play.innerHTML = `
            <p class="song-btn-text text-white font-bold">Play</p>
            <img src="assets/icons/play.png" alt="play" class="song-btn-img" />
        `;
    footer_btn_play.src = "assets/icons/play.png";
  }
};

const mute = () => {
  if (player.muted) {
    player.muted = false;
    mute_btn.src = "assets/icons/sound.png";
  } else {
    player.muted = true;
    mute_btn.src = "assets/icons/mute.png";
  }
};

const loop = () => {
  if (player.loop) {
    player.loop = false;
    loop_btn.src = "assets/icons/repeat.png";
  } else {
    player.loop = true;
    loop_btn.src = "assets/icons/repeat_one.png";
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
