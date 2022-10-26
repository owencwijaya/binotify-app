const genreCallback = (data) => {
    const res = JSON.parse(data);
    if (res["status"] === 200) { 
        res["data"].forEach((genre) => {

            newHref = `${window.location.href}` + (window.location.href.includes("?") ? "&" : "?") + `genre=${genre}`
            document.getElementById('filter-content').innerHTML += 
            `<a href = ${newHref}>${genre}</a>`
        })
    } else {
        alert(res["message"]);
    }
    return;
}


const getGenres = () => {
    try {
        const formData = new FormData();
        formData.append("session_id", getCookie("PHPSESSID") || "");
        request("POST", "/api/songs/get_genres.php", formData, genreCallback);
        return;
    } catch(err){
        alert(err);
    }
}