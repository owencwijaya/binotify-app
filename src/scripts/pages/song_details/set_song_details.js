const edit_admin = (song_id) => {
  try {
    let session_id = getCookie("session_id") || getCookie("PHPSESSID");
    if (session_id) {
      const formData = new FormData();
      formData.append("session_id", session_id);
      request("POST", "/api/auth/check_admin.php", formData, (response) => {
        const res = JSON.parse(response);
        if (res["status"] === 200) {
          let content = document.getElementById("song-btn").innerHTML;
          content += `
                      <button id="btn-edit" class="song-btn flex flex-row items-center justify-center" onclick="edit_song(${song_id})">
                        <p class="song-btn-text text-white font-bold">Edit</p>
                        <img src="assets/icons/edit.png" alt="play" class="song-btn-img" />
                      </button>
                      `;
          document.getElementById("song-btn").innerHTML = content;
        }
      });
    }
  } catch (err) {
    alert(err);
  }
};

const set_song_details_callback = (response) => {
  alert(response)
  const res = JSON.parse(response);
  const song = res.data;

  let minutes = Math.floor(song["duration"] / 60);
  let seconds = song["duration"] % 60;
  let duration = `${
    minutes < 10 ? "0" + minutes.toString() : minutes.toString()
  }:${seconds < 10 ? "0" + seconds.toString() : seconds.toString()}`;

  let content = `
          <div class="song-left flex justify-center">
            <img
              src="${song["image_path"]}"
              alt="song"
              class="song-img"
            />
          </div>
          <div class="song-right">
            <h2 class="song-title">${song["judul"]}</h2>
            <p class="song-artist">Artist : ${song["penyanyi"]}</p>
            <p class="song-album">
              Album : <a href="#" class="font-bold">
              ${song["album"]}
              <img src="assets/icons/open.png" alt="open" class="open-icon" />
              </a>
            </p>
            <p class="song-genre">Genre : ${song["genre"]}</p>
            <p class="song-year">Release : ${song["tanggal_terbit"]}</p>
            <p class="song-duration">Duration : ${duration}</p>
            <div id="song-btn" class="flex flex-row">
              <button id="btn-play" class="song-btn flex flex-row items-center justify-center" onclick="play_and_pause()">
                <p class="song-btn-text text-white font-bold">Play</p>
                <img src="assets/icons/play.png" alt="play" class="song-btn-img" />
              </button>
            </div>
          </div>
    `;
  document.getElementById("song-detail").innerHTML = content;

  let footer_left = `
      <img
        src="${song["image_path"]}"
        alt="song"
        class="footer-song-img"
      />
      <div class="flex flex-col justify-center">
        <h3 class="font-bold">${song["judul"]}</h3>
        <h5 class="font-normal">${song["penyanyi"]}</h5>
      </div>
    `;
  document.getElementById("footer-left").innerHTML = footer_left;

  let player = `<source src="${song["audio_path"]}" />`;
  document.getElementById("player").innerHTML = player;
  document.getElementById("duration").innerHTML = duration;
  document.getElementById("page-title").innerHTML = "Song Details";

  edit_admin(song["song_id"]);
};

const set_song_details = (song_id) => {
  try {
    const formData = new FormData();
    formData.append("song_id", song_id);
    request(
      "POST",
      "/api/songs/get_song.php",
      formData,
      set_song_details_callback
    );
  } catch (error) {
    alert(error);
  }
};

set_song_details(new URLSearchParams(window.location.search).get("song_id"));
