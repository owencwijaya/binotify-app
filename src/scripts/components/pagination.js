const createPagination = (title, headers) => {
    document.getElementById("pagination-container").innerHTML =
    `
        <h1>| ${title}</h1>
        <table id="user-list-table">
            <thead>
                <tr>
                ${headers.map((item) => {
                    return `<th>${item}</th>`
                }).join(' ')}
                </tr>
            </thead>

            <tbody>

            </tbody>
        </table>

        <div class="pagination-buttons">
            <button id="pagination-prev-button">Previous</button>
            <p id="page-info"></p>
            <button id="pagination-next-button">Next</button>
        </div>
    `
}