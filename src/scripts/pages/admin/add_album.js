const addAlbumCallback = (data) =>{
    console.log(data)
    
    try{
        let res = JSON.parse(data); //gws
        if(res["message"] === 200){
            location.reload()
        }else{
            alert(res["message"])
            console.log(res["data"])
        }
    }catch(err){
        alert(err.message)
    }

}

const addAlbum = (event) =>{
    event.preventDefault();

    title = toTitleCase(document.getElementById("title").value);
    singer = toTitleCase(document.getElementById("singer").value);
    genre = toTitleCase(document.getElementById("genre").value);
    tanggalTerbit = document.getElementById("tanggalTerbit").value;
    f_image = document.getElementById("f_image").value;
    session_id = getCookie("PHPSESSID") || "";
    
    try{
        let formData = new FormData(event.target);
        request("POST", "/api/admin/add_album.php", formData, addAlbumCallback);
        return;
    }catch(err){
        console.log(err)
        alert(err);
    }
}