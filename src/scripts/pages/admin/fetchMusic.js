const addMusicCallback = (data) =>{
    console.log(data)
    
    try{
        let res = JSON.parse(data); //gws
        if(res["message"] === 200){
            location.reload()
        }else{
            alert(res["message"])
            console.log(res["message"])
        }
    }catch(err){
        alert(err.message)
    }

}

const fetchMusic = (event) =>{
    event.preventDefault();

    title = toTitleCase(document.getElementById("title").value);
    singer = toTitleCase(document.getElementById("singer").value);
    tanggalTerbit = document.getElementById("tanggalTerbit").value;
    f_image = document.getElementById("f_image").value;
    f_audio = document.getElementById("f_audio").value;
    f_dur = document.getElementById("f_dur").value;
    session_id = getCookie("session_id") || getCookie("PHPSESSID"); 

    try{
        let formData = new FormData(event.target);
        request("POST", "/api/admin/fetchMusic.php", formData, addMusicCallback);
        return;
    }catch(err){
        console.log(err)
        alert(err);
    }
}