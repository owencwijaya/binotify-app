const createPagination = (title) => {
    document.getElementById("pagination-container").innerHTML =
    `
        <h1>| ${title}</h1>
        <div id = "pagination-content"></div>

        <div class="pagination-buttons">
            <button id="pagination-prev-button">Previous</button>
            <p id="page-info"></p>
            <button id="pagination-next-button">Next</button>
        </div>
    `
}