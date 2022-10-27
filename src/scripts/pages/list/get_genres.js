const genreCallback = (data) => {
    const res = JSON.parse(data);
    if (res["status"] === 200) { 
        const params = new URLSearchParams(window.location.search);
        params.set("genre", "");
        document.getElementById('filter-content').innerHTML += 
        `<a href = ${window.location.pathname + "?" +  params.toString()}>All</a>`

        res["data"].forEach((genre) => {
            params.set("genre", genre.toLowerCase());
            document.getElementById('filter-content').innerHTML += 
            `<a href = ${window.location.pathname + "?" +  params.toString()}>${genre}</a>`
        })
    } else {
        alert(res["message"]);
    }
    return;
}


const getGenres = (table) => {
    try {
        const formData = new FormData();
        formData.append("session_id", getCookie("PHPSESSID") || "");
        formData.append("table", table.toLowerCase());
        request("POST", "/api/songs/get_genres.php", formData, genreCallback);
        return;
    } catch(err){
        alert(err);
    }
}