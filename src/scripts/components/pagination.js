const createPagination = (title, needsFilter) => {
    document.getElementById("pagination-container").innerHTML =
    `
        <div id = "pagination-header">
            <h1>| ${title}</h1>
            ${needsFilter ?
                `
                <button id = "sort-by-name-button" 
                    
                    onclick = "nameHref('name');"
                >
                    Sort by name <p id = "sort-name-arrow">↑</p>
                </button>

                <button id = "sort-by-year-button"
                    onclick = "nameHref('year');"
                >
                    Sort by year <span id = "sort-year-arrow">↑</span>
                </button>

                <div id="filter-dropdown">
                    <button id="filter-dropbutton">Filter by Genre</button>
                    <div id="filter-content">
                    </div>
                </div>`
                : ``
            }
        </div>

        <div id = "pagination-content"></div>

        <div class="pagination-buttons">
            <button id="pagination-prev-button">Previous</button>
            <p id="page-info"></p>
            <button id="pagination-next-button">Next</button>
        </div>
    `

    needsFilter && getGenres();
    needsFilter && updateArrow('name');
    needsFilter && updateArrow('year');
}

const updateArrow = (button) => {
    const params = new URLSearchParams(window.location.search)

    if (params.get('sort_by') == button && params.get('sort_order') == 'asc'){
        document.getElementById(`sort-${button}-arrow`).innerHTML= '↓'
    }
}

const nameHref = (button) => {
    const params = new URLSearchParams(window.location.search)
    
    var newHref;
    const sortBy = params.get('sort_by')
    const sortOrder = params.get('sort_order')

    if (sortBy && sortOrder){
        if ((sortOrder) == 'asc'){
            newHref = window.location.href.replace('asc', 'desc') 
        } else {
            newHref = window.location.href.replace('desc', 'asc') 
        }

        if (sortBy !== button){
            newHref = window.location.href.replace(sortBy, button)
        }
    } else {
        newHref = `${window.location.href}` + (window.location.href.includes("?") ? "&" : "?") + `sort_by=${button}&sort_order=asc`;
    }
    window.location = newHref;
}