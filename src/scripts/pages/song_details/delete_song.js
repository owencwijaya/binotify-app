const delete_song_callback = (response) => {
  try {
    const res = JSON.parse(response);
    document.getElementById("modal-container").classList.add("hidden");
    res["status"] == 200
      ? setModal("Success", "Song deleted successfully", "OK", "")
      : setModal("Failed", "Failed to delete song", "OK", "");
    document.getElementById("modal-btn-primary").addEventListener("click", () => {
      window.location.href = "/index.html";
    });
  } catch (error) {
    alert(error);
    console.log(error)
  }
};

const delete_song = (song_id) => {
  console.log("delete song: ", song_id);
  try {
    const formData = new FormData();
    formData.append("session_id", getCookie("PHPSESSID") || "");
    formData.append("song_id", song_id);
    request("POST", "/api/admin/delete_song.php", formData, delete_song_callback);
  } catch (error) {
    alert(error);
  }
};

const handle_delete_song = (song_id) => {
  setModal("Delete Song", "Do you want to delete this song?", "Yes", "No");
  document.getElementById("modal-btn-primary").addEventListener("click", () => {
    delete_song(song_id);
  });
  document.getElementById("modal-btn-secondary").addEventListener("click", () => {
    document.getElementById("modal-container").classList.add("hidden");
  });
};
