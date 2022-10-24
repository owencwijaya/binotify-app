const createSearchBar = () => {
    document.getElementById("searchbar").innerHTML = 
    `          
    <input type="text" class="searchbar-input" placeholder="Search for a song here..." />
    <img
      src="../assets/icons/searchbar.png"
      alt="Search"
      class="searchbar-icon"
    />
    `

    document.getElementsByClassName("searchbar-input")[0].onkeydown = (event) => {
        if (event.key === "Enter"){
            event.preventDefault();
            location.href = `/search.html?query=${document.getElementsByClassName("searchbar-input")[0].value}`
        }
    }
}

window.onload = createSearchBar;