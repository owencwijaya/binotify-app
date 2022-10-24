const getUserListCallback = (data) => {
    const res = JSON.parse(data)
    const sentData = JSON.parse(res["data"]);

    if (res["status"] === 200) {
        var userListTable = document.getElementById('user-list-table');
        var tbody = userListTable.getElementsByTagName('tbody')[0];
        tbody.innerHTML = sentData["rows"];

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


const getUserList = (pageNumber = 1) => {
    try {
        const formData = new FormData();
        formData.append("page_number", pageNumber);
        request("POST", "/api/admin/user_list.php", formData, getUserListCallback);
        return;
    } catch (err) {
        alert(err);
    }
}

window.onload = getUserList(1);