const createSearchBar = () => {
    document.getElementById("searchbar").innerHTML = 
    `          
    <input type="text" class="searchbar-input" placeholder="Search for a song here..." />
    <img
      src="../assets/icons/searchbar.png"
      alt="Search"
      class="searchbar-icon"
      onclick = search()
    />
    `


    document.getElementsByClassName("searchbar-input")[0].onkeydown = (event) => {
        if (event.key === "Enter"){
            event.preventDefault();
            search()

        }
    }
}

const search = () => {
    const value = document.getElementsByClassName("searchbar-input")[0].value;
    if(!isOnlyAlphaNumeric(value)){
        setModal("Invalid query", "Query only accept alphanumeric", "OK", "");
        document.getElementById("modal-btn-primary").addEventListener("click",()=>{
            window.location.reload();
        })
    }else{
        const params = new URLSearchParams(window.location.search);
        params.set('query', value)
        location.href = "song_list.html" + "?" +  params.toString()
    }
}

window.onload = createSearchBar;