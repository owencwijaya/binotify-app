const addAlbumCallback = (data) =>{    
    try{
        let res = JSON.parse(data); //gws
        if(res["status"] === 200){
            setModal("Success", "Album added successfully", "OK", "");
            document.getElementById("modal-btn-primary").addEventListener("click", () => {
                window.location.reload();
              });
        }else{
            alert(res["message"]);
        }
    }catch(err){
        alert(err.message)
    }

}

const add_album = () =>{
    title = toTitleCase(document.getElementById("title").value);
    singer = toTitleCase(document.getElementById("singer").value);
    genre = toTitleCase(document.getElementById("genre").value);
    tanggalTerbit = document.getElementById("tanggalTerbit").value;
    f_image = document.getElementById("f_image").files[0];
    session_id = getCookie("PHPSESSID") || "";

    if(!isOnlyAlphaNumeric(title) || !isOnlyAlphaNumeric(genre) || !isOnlyAlphaNumeric(singer)){
        setModal("Invalid input", "Only alphanumeric input allowable", "OK", "");
          document.getElementById("modal-btn-primary").addEventListener("click", () => {
            document.getElementById("modal-container").classList.add("hidden");
          });
        return;
      }
    
    let formData = new FormData();

    formData.append("session_id", session_id);
    formData.append("title", title);
    formData.append("singer", singer);
    formData.append("genre", genre);
    formData.append("tanggalTerbit", tanggalTerbit);
    formData.append("f_image", f_image);

    try{
        request("POST", "/api/admin/add_album.php", formData, addAlbumCallback);
        return;
    }catch(err){
        alert(err);
    }
}


const handle_add_album = (event) => {
    event.preventDefault();
    setModal("Add Album", "Do you want to add new album?", "Yes", "No");
    console.log("aaaa")
    document.getElementById("modal-btn-primary").addEventListener("click", () => {
      add_album();
    });
    document.getElementById("modal-btn-secondary").addEventListener("click", () => {
        close_modal();
    });
  };