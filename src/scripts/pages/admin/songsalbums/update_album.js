const submit_album = (album_id) => {
    let formData = new FormData();
    let genre = toTitleCase(document.getElementById("genre").value);
    let judul = toTitleCase(document.getElementById("judul").value);
   
    if(!isOnlyAlphaNumeric(judul) || !isOnlyAlphaNumeric(genre)){
      setModal("Invalid input", "Only alphanumeric input allowable", "OK", "");
        document.getElementById("modal-btn-primary").addEventListener("click", () => {
          document.getElementById("modal-container").classList.add("hidden");
        });
      return;
    }
  
    let tanggal_terbit = (document.getElementById("tanggal_terbit").value);
    let image = document.getElementById("image").value;
    formData.append("session_id", getCookie("PHPSESSID") || "");
    formData.append("album_id", album_id);
    formData.append("judul", judul);
    formData.append("genre", genre);
    formData.append("tanggal_terbit", tanggal_terbit);
  
    !image ? formData.append("image", image) : formData.append("image", "");
  
    try{
      request("POST", "/api/admin/update_detail_album.php", formData, update_song_callback);
      return;
    } catch (error) {
      alert(error);
    }
  };
  
  const handle_update_album = (album_id) => {
    setModal("Save Album", "Do you want to save your changes?", "Yes", "No");
    document.getElementById("modal-btn-primary").addEventListener("click", () => {
      submit_album(album_id);
    });
    document.getElementById("modal-btn-secondary").addEventListener("click", () => {
      close_modal();
    });
  };