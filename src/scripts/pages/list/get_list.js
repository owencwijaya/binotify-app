const getListCallback = (data) => {
    const res = JSON.parse(data)

    let sentData;

    if (res["status"] === 200){
        sentData = JSON.parse(res["data"]);
    }

    if (res["status"] === 200) {
        var paginationContent = document.getElementById('pagination-content');
        
        paginationContent.innerHTML = "";
        
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
            prevButton.onclick = () => getList(pageNumber - 1, sentData["table"])
        }

        if (pageNumber === pageTotal){
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
            nextButton.onclick = () => getList(pageNumber + 1, sentData["table"])
        }
    } else {
        alert(res["message"])
    }

    return;
}


const getList = (pageNumber = 1, table) => {
    try {
        const params = new URLSearchParams(window.location.search)
        const formData = new FormData();
        formData.append("page_number", pageNumber);
        formData.append("query", params.get('query') || "");
        formData.append("genre", params.get('genre') || "");
        formData.append("sort_by", params.get('sort_by') || "");
        formData.append("sort_order", params.get('sort_order') || "");
        formData.append("table", table);
        request("POST", "/api/songs/search.php", formData, getListCallback);
        return;
    } catch (err) {
        alert(err);
    }
}
