const edit_song_callback = (response) => {
  const res = JSON.parse(response);
  const song = res.data;

  document.getElementById("judul").value = song["judul"];
  document.getElementById("penyanyi").value = song["penyanyi"];
  document.getElementById("genre").value = song["genre"];
  document.getElementById("tanggal_terbit").value = song["tanggal_terbit"];
  document.getElementById("edit-song-btns").innerHTML = `
    <button id="btn-submit-song" class="edit-song-btn" onclick="handle_update_song(${song["song_id"]})">Save</button>
    <button id="btn-delete-song" class="edit-song-btn" onclick="handle_delete_song(${song["song_id"]})">Delete</button>`;

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
