const createPagination = (title, needsFilter, isForAlbumDetail = false, isAdmin = false) => {
  document.getElementById("pagination-container").innerHTML = `
        <div id = "pagination-header">
            <h2>| ${title} List</h2>
            ${
              needsFilter
                ? `
                <div id = "pagination-filters">
                    <button id = "sort-by-title-button" 
                        
                        onclick = "nameHref('title');"
                    >
                        Sort by title <span id = "sort-title-arrow" class = "arrow">↑</span>
                    </button>

                    <button id = "sort-by-year-button"
                        onclick = "nameHref('year');"
                    >
                        Sort by year <span id = "sort-year-arrow" class = "arrow">↑</span>
                    </button>

                    <div id="filter-dropdown">
                        <button id="filter-dropbutton">Filter by Genre</button>
                        <div id="filter-content"></div>
                    </div>


                </div>


                `
                : ``
            }
            <h2 id = "pagination-msg"></h2>
            ${
              title === "User"
                ? ``
                : `
                <div id = "pagination-table-header" hidden>
                    <div id = "headers">
                    ${isForAlbumDetail ? ` ` : `<div id = "row-p">Artist</div>`}
                        <div id = "row-p">Genre</div>
                        <div id = "row-p">Year Released</div>
                        <div id = "row-p">Duration</div>
                    ${isForAlbumDetail && isAdmin ? `<div id = "row-p"></div>` : ``}
                    </div>
              </div>
                `
            }

        </div>

        <div id = "pagination-content"></div>
        
        ${
          isForAlbumDetail
            ? ``
            : ` <div id="pagination-buttons">
            <button id="pagination-prev-button">Previous</button>
            <p id="page-info"></p>
            <button id="pagination-next-button">Next</button>
        </div>
        `
        }
    `;

  needsFilter && getGenres(title);
  needsFilter && updateArrow("title");
  needsFilter && updateArrow("year");
};

const updateArrow = (button) => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("sort_by") == button && params.get("sort_order") == "asc") {
    document.getElementById(`sort-${button}-arrow`).innerHTML = "↓";
  }
};

const nameHref = (button) => {
  const params = new URLSearchParams(window.location.search);
  const sortOrder = params.get("sort_order");

  if (sortOrder) {
    if (sortOrder === "asc") {
      params.set("sort_order", "desc");
    } else {
      params.set("sort_order", "asc");
    }
  } else {
    params.set("sort_order", "asc");
  }

  params.set("sort_by", button);

  window.location = window.location.pathname + "?" + params.toString();
};
