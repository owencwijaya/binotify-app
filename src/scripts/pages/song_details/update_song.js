const update_song_callback = (response) => {
  try {
    const res = JSON.parse(response);
    set_song_details(res.data["song_id"]);
    document.getElementById("song-detail").classList.remove("hidden");
    document.getElementById("edit-song").classList.add("hidden");
    document.getElementById("page-title").innerHTML = "Song Details";
  } catch (error) {
    alert(error);
  }
};

const update_song = (song_id) => {
  let judul = document.getElementById("judul").value;
  let penyanyi = document.getElementById("penyanyi").value;
  let album_id = document.getElementById("album").value;
  let genre = document.getElementById("genre").value;
  let tanggal_terbit = document.getElementById("tanggal_terbit").value;
  let image = document.getElementById("f_image").files[0];
  let audio = document.getElementById("f_audio").files[0];
  let duration = document.getElementById("f_dur").value;

  if (image == undefined || audio == undefined) {
    alert("Please select image and audio file");
    return;
  }

  let formData = new FormData();
  formData.append("session_id", getCookie("PHPSESSID") || "");
  formData.append("song_id", song_id);
  formData.append("judul", judul);
  formData.append("penyanyi", penyanyi);
  formData.append("album_id", album_id);
  formData.append("genre", genre);
  formData.append("tanggal_terbit", tanggal_terbit);
  formData.append("image", image);
  formData.append("audio", audio);
  formData.append("duration", duration);

  try {
    request(
      "POST",
      "/api/admin/update_song.php",
      formData,
      update_song_callback
    );
    return;
  } catch (error) {
    alert(error);
  }
};
