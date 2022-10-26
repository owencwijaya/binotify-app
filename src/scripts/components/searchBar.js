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

            const value = document.getElementsByClassName("searchbar-input")[0].value;
            const params = new URLSearchParams(window.location.search);
            params.set('query', value)
            location.href = window.location.pathname + "?" +  params.toString()
        }
    }
}

window.onload = createSearchBar;