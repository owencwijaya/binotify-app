const update_song_callback = (response) => {
  try {
    const res = JSON.parse(response);
    if (res["status"] == 200) {
      document.getElementById("modal-container").classList.add("hidden");
      setModal("Success", "Song updated successfully", "OK", "");
      document.getElementById("modal-btn-primary").addEventListener("click", () => {
        window.location.reload();
      });
    } else {
      document.getElementById("modal-container").classList.add("hidden");
      setModal("Failed", "Failed to update song", "OK", "");
      document.getElementById("modal-btn-primary").addEventListener("click", () => {
        window.location.reload();
      });
    }
  } catch (error) {
    alert(error);
  }
};

const update_song = (song_id) => {
  let judul = document.getElementById("judul").value;
  // let penyanyi = document.getElementById("penyanyi").value;
  let album_id = document.getElementById("album").value;
  let genre = document.getElementById("genre").value;
  let tanggal_terbit = document.getElementById("tanggal_terbit").value;
  let image = document.getElementById("f_image").files[0];
  let audio = document.getElementById("f_audio").files[0];
  let duration = document.getElementById("f_dur").value;

  let formData = new FormData();
  formData.append("session_id", getCookie("PHPSESSID") || "");
  formData.append("song_id", song_id);
  formData.append("judul", judul);
  // formData.append("penyanyi", penyanyi);
  formData.append("album_id", album_id);
  formData.append("genre", genre);
  formData.append("tanggal_terbit", tanggal_terbit);
  formData.append("duration", duration);

  audio != undefined ? formData.append("audio", audio) : formData.append("audio", "");
  image != undefined ? formData.append("image", image) : formData.append("image", "");

  try {
    request("POST", "/api/admin/update_song.php", formData, update_song_callback);
    return;
  } catch (error) {
    alert(error);
  }
};

const handle_update_song = (song_id) => {
  const close_modal = () => {
    document.getElementById("modal-container").classList.add("hidden");
  };
  setModal("Save Song", "Do you want to save your changes?", "Yes", "No");
  document.getElementById("modal-btn-primary").addEventListener("click", () => {
    update_song(song_id);
  });
  document.getElementById("modal-btn-secondary").addEventListener("click", () => {
    close_modal();
  });
};
