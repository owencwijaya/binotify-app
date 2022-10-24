const getSearchCallback = (data) => {
    const res = JSON.parse(data)

    let sentData;

    if (res["status"] === 200){
        sentData = JSON.parse(res["data"]);
    }

    if (res["status"] === 200) {
        var paginationContent = document.getElementById('pagination-content');
        
        paginationContent.innerHTML = "";
        
        sentData["rows"].forEach((item) =>{
          paginationContent.innerHTML += createInfoRow(item);
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
            prevButton.onclick = () => getSongsList(pageNumber - 1)
        }

        if (pageNumber === pageTotal){
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
            nextButton.onclick = () => getSongsList(pageNumber + 1)
        }
    } else {
        alert(res["message"])
    }

    return;
}


const getSongsList = (pageNumber = 1) => {
    try {
        const params = new URLSearchParams(window.location.search)
        const formData = new FormData();
        formData.append("page_number", pageNumber);
        formData.append("query", params.get('query'));
        formData.append("sort_by", params.get('sort_by'));
        formData.append("filter_by", params.get('filter_by'));
        request("POST", "/api/songs/search.php", formData, getSearchCallback);
        return;
    } catch (err) {
        alert(err);
    }
}

window.onload = getSongsList(1);