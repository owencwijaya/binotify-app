const addMusicCallback = (data) =>{    
    try{
        document.getElementById("modal-container").classList.add("hidden");
        let res = JSON.parse(data); //gws
        if(res["status"] === 200){
            setModal("Success", "Song added successfully", "OK", "");
            document.getElementById("modal-btn-primary").addEventListener("click", () => {
                window.location.reload();
            });
        }else{
            setModal("Error", `${res["message"]}`, "OK", "");
        }
    }catch(err){
        alert(err.message)
    }

}

const addSong = (event) =>{

    title = toTitleCase(document.getElementById("title").value);
    singer = toTitleCase(document.getElementById("singer").value);
    genre = toTitleCase(document.getElementById("genre").value);
    tanggalTerbit = document.getElementById("tanggalTerbit").value;
    f_image = document.getElementById("f_image").files[0];
    f_audio = document.getElementById("f_audio").files[0];
    f_dur = document.getElementById("f_dur").value;
    session_id = getCookie("PHPSESSID") || ""; 

    if(!isOnlyAlphaNumeric(singer) || !isOnlyAlphaNumeric(genre) || !isOnlyAlphaNumeric(title)){
        setModal("Invalid input", "Only alphanumeric input allowable", "OK", "");
          document.getElementById("modal-btn-primary").addEventListener("click", () => {
            document.getElementById("modal-container").classList.add("hidden");
          });
        return;
      }
    
    try{
        let formData = new FormData(event.target);
        request("POST", "/api/admin/add_song.php", formData, addMusicCallback);
        return;
    }catch(err){
        alert(err);
    }
}

const handle_add_song = (event) => {
    event.preventDefault();
    setModal("Add song", "Do you want to add new song?", "Yes", "No");
    document.getElementById("modal-btn-primary").addEventListener("click", () => {
      addSong(event);
    });
    document.getElementById("modal-btn-secondary").addEventListener("click", () => {
        close_modal();
    });
  };