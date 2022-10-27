const delete_song_callback = (response) => {
  const res = JSON.parse(response);
  console.log(res);
  document.getElementById("song-detail").classList.remove("hidden");
  document.getElementById("edit-song").classList.add("hidden");
  document.getElementById("page-title").innerHTML = "Song Details";
  window.location.href = "/index.html";
};

const delete_song = (song_id) => {
  try {
    const formData = new FormData();
    formData.append("session_id", getCookie("PHPSESSID") || "");
    formData.append("song_id", song_id);
    request(
      "POST",
      "/api/admin/delete_song.php",
      formData,
      delete_song_callback
    );
  } catch (error) {
    alert(error);
  }
};
