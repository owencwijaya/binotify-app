
const handle_delete_album = (album_id) => {
    setModal("Delete Song From Album", "Do you want to delete this song?", "Yes", "No");
    document.getElementById("modal-btn-primary").addEventListener("click", () => {
      delete_album(album_id);
    });
    document.getElementById("modal-btn-secondary").addEventListener("click", () => {
      close_modal();
    });
  };
  
  const delete_album = (album_id) => {
    try {
      const formData = new FormData();
      formData.append("session_id", getCookie("PHPSESSID") || "");
      formData.append("album_id", album_id);
      request("POST", "/api/admin/delete_album.php", formData, delete_song_callback);
    } catch (error) {
      alert(error);
    }
  };