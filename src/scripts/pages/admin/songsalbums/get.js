const getSongsListCallback = (data) => {
    console.log(data)

    const res = JSON.parse(data)
    const sentData = JSON.parse(res["data"]);
    
    if (res["status"] === 200) {
        
        var paginationContent = document.getElementById('pagination-content');
        alert(sentData["rows"])
        sentData["rows"].forEach((item) =>{
            paginationContent.innerHTML += createInfoRow(item, sentData["table"] === "album");
        })

        var pageNumber = parseInt(sentData["page_number"]);
        var pageTotal = parseInt(sentData["page_total"]);

        document.getElementById('page-info').innerHTML = `Page ${pageNumber} of ${pageTotal}`;
        
        var prevButton = document.getElementById('pagination-prev-button');
        var nextButton = document.getElementById('pagination-next-button');

        if (pageNumber === 1){
            prevButton.onclick = null
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
            prevButton.onclick = () => getUserList(pageNumber - 1)
        }

        if (pageNumber === pageTotal){
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
            nextButton.onclick = () => getUserList(pageNumber + 1)
        }
    } else {
        alert(res["message"])
    }

    return;
}


const getSongsList = (pageNumber = 1) => {
    try {
        let query = params.album_id
        console.log(query)
        const formData = new FormData();
        formData.append("page_number", pageNumber);
        request("POST", `/api/admin/songs-albums.php?album_id=${query}`, formData, getSongsListCallback);
        return;
    } catch (err) {
        alert(err);
    }
}


const params = new Proxy( new URLSearchParams(window.location.search),{
    get: (searchParams, prop) => searchParams.get(prop),
})
window.onload = getSongsList(1);