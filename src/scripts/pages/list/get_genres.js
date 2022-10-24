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
        request("POST", "/api/songs/get_genres.php", null, genreCallback);
        return;
    } catch(err){
        alert(err);
    }
}