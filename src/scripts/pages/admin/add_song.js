const addMusicCallback = (data) =>{    
    try{
        let res = JSON.parse(data); //gws
        if(res["status"] === 200){
            location.reload()
        }
    }catch(err){
        alert(err.message)
    }

}

const addSong = (event) =>{
    event.preventDefault();

    title = toTitleCase(document.getElementById("title").value);
    singer = toTitleCase(document.getElementById("singer").value);
    genre = toTitleCase(document.getElementById("genre").value);
    tanggalTerbit = document.getElementById("tanggalTerbit").value;
    f_image = document.getElementById("f_image").value;
    f_audio = document.getElementById("f_audio").value;
    f_dur = document.getElementById("f_dur").value;
    alert(f_dur)
    session_id = getCookie("PHPSESSID") || ""; 

    try{
        let formData = new FormData(event.target);
        request("POST", "/api/admin/add_song.php", formData, addMusicCallback);
        return;
    }catch(err){
        alert(err);
    }
}