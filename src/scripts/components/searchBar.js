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
            
            var newHref = new URL(location.href);
            const params = new URLSearchParams(newHref.search);

            if (params.get('query')){
                params.set('query', value);
                location.href = "song_list.html?" + params;
                return;
            }

            if (location.href.includes('?')){
                newHref += '&'
            } else {
                newHref += '?'
            }

            newHref += `query=${value}`
            location.href = newHref
        }
    }
}

window.onload = createSearchBar;