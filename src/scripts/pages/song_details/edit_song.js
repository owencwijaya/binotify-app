const delete_song = (song_id) => {
  console.log("success delete song:", song_id);
  document.getElementById("song-detail").classList.remove("hidden");
  document.getElementById("edit-song").classList.add("hidden");
  document.getElementById("page-title").innerHTML = "Song Details";
};

const edit_song_callback = (response) => {
  const res = JSON.parse(response);
  const song = res.data;

  let content = `
    <form id="edit-song-form" class="flex flex-col" onsubmit="return false">
        <div class="edit-song-item flex flex-row items-center">
            <label for="judul" class="edit-song-label">Judul</label>
            <input type="text" name="judul" id="judul" class="edit-song-input" value="${song["judul"]}" />
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="penyanyi" class="edit-song-label">Penyanyi</label>
            <input type="text" name="penyanyi" id="penyanyi" class="edit-song-input" value="${song["penyanyi"]}" />
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="album" class="edit-song-label">Album</label>
            <select name="album" id="album" class="edit-song-input"></select>
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="genre" class="edit-song-label">Genre</label>
            <input type="text" name="genre" id="genre" class="edit-song-input" value="${song["genre"]}" />
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="tanggal_terbit" class="edit-song-label">Tanggal Terbit</label>
            <input type="date" name="tanggal_terbit" id="tanggal_terbit" class="edit-song-input" value="${song["tanggal_terbit"]}" />
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="f_image" class="edit-song-img-label">Cover Photo</label>
            <input type="file" name="f_image" id="f_image" class="" />
        </div>
        <div class="edit-song-item flex flex-row items-center">
            <label for="f_audio" class="edit-song-audio-label">Song Track</label>
            <input type="file" name="f_audio" id="f_audio" class="" />
        </div>
        <audio id="audio" hidden></audio>
        <input type="text" name="f_dur", id="f_dur" hidden/>
        <div class="edit-song-btns flex flex-row items-center">
            <button id="btn-submit-song" class="edit-song-btn" onclick="update_song(${song["song_id"]})">Submit</button>
            <button id="btn-delete-song" class="edit-song-btn" onclick="delete_song(${song["song_id"]})">Delete</button>
        </div>
    </form>
  `;

  document.getElementById("edit-song").innerHTML = content;
  document.getElementById("page-title").innerHTML = "Edit Song";
  setDuration();
};

const fillAlbums = (response) => {
  const res = JSON.parse(response);
  const albums = res.data;

  if (albums.length > 0) {
    let content = `<option value="0">Tanpa Album</option>`;
    albums.forEach((album) => {
      content += `<option value="${album["album_id"]}">${album["judul"]}</option>`;
    });
    document.getElementById("album").innerHTML = content;
  }
};

const edit_song = (song_id) => {
  document.getElementById("song-detail").classList.add("hidden");
  document.getElementById("edit-song").classList.remove("hidden");
  try {
    const formData = new FormData();
    formData.append("session_id", getCookie("PHPSESSID") || "");
    formData.append("song_id", song_id || "");
    request("POST", "/api/songs/get_song.php", formData, edit_song_callback);
    const formData2 = new FormData();
    formData2.append("session_id", getCookie("PHPSESSID") || "");
    request("POST", "/api/songs/get_albums.php", formData2, fillAlbums);
  } catch (error) {
    alert(error);
  }
};
