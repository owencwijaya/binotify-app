const getSongsListCallback = (data) => {
    const res = JSON.parse(data)

    let sentData;

    if (res["data"].length > 0){
        sentData = JSON.parse(res["data"]);
    }

    
    if (res["status"] === 200) {
        document.getElementById('pagination-table-header').removeAttribute("hidden");
        var paginationContent = document.getElementById('pagination-content');
        
        const formData = new FormData();
        formData.append("session_id", getCookie("PHPSESSID") || "")
        request("POST", "api/auth/check_admin.php", formData, (data) => {
            const resp = JSON.parse(data);
            sentData["rows"].forEach((item) =>{
                paginationContent.innerHTML += createInfoRow(item, sentData["table"] === "album", true, resp["status"] === 200);
            })
        } )

    } else if (res["status"] === 404){
        document.getElementById("pagination-msg").innerHTML = "This album doesn't have any song yet!";
    }
    else {
        alert(res["message"])
    }

    return;
}


const getSongsList = (pageNumber = 1) => {
    try {
        let query = params.album_id
        const formData = new FormData();
        formData.append("page_number", pageNumber);
        formData.append("album_id", query);
        request("POST", `/api/admin/songs-albums.php`, formData, getSongsListCallback);
        return;
    } catch (err) {
        alert(err);
    }
}


const params = new Proxy( new URLSearchParams(window.location.search),{
    get: (searchParams, prop) => searchParams.get(prop),
})
window.onload = getSongsList(1);