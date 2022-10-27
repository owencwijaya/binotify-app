const createNavbar = (data) => {
  const res = JSON.parse(data);
  const isAdmin = res["status"] !== 403 ;
  const isLoggedIn = res["status"] !== 401;

  document.getElementById("navigation-container").innerHTML = `
    <nav class="sidebar bg-black flex flex-col">
      <div class="logo">
        <img
          src="assets/images/binotify.png"
          alt="Binotify"
          class="logo-img"
        />
      </div>
      <div id="menu" class="menu flex flex-col">
        <a href="index.html" class="menu-item flex flex-row items-center 
        ${location.href.includes("index.html") && `sidebar-selected`}">
            <img src="assets/icons/home.png" alt="Home" class="menu-item-icon" />
            <span class="menu-text">Home</span >
        </a>

        <a href="song_list.html" class="menu-item flex flex-row items-center
        ${(location.href.includes("song_list.html") || location.href.includes("song_detail.html")) && `sidebar-selected`}">
            <img src="assets/icons/search.png" alt="Search Songs" class="menu-item-icon" />
            <span class="menu-text">Search Songs</span>
        </a>
        <a href="album_list.html" class="menu-item flex flex-row items-center
        ${(location.href.includes("album_list.html") || location.href.includes("album_detail.html")) && `sidebar-selected`}">
            <img src="assets/icons/library.png" alt="Albums" class="menu-item-icon" />
            <span class="menu-text">List Albums</span>
        </a>
        ${
          isLoggedIn && isAdmin
            ?`
            <a href="add_song.html" class="menu-item flex flex-row items-center
            ${location.href.includes("add_song.html") && `sidebar-selected`}">
                <img src="assets/icons/add.png" alt="Add" class="menu-item-icon" />
                <span class="menu-text">Add Songs</span>
            </a>
            <a href="add_album.html" class="menu-item flex flex-row items-center
            ${location.href.includes("add_album.html") && `sidebar-selected`}">
                <img src="assets/icons/add.png" alt="Add" class="menu-item-icon" />
                <span class="menu-text">Add Albums</span>
            </a>
            <a href="user_list.html" class="menu-item flex flex-row items-center
            ${location.href.includes("user_albums.html") && `sidebar-selected`}">
                <img src="assets/icons/user.png" alt="Add" class="menu-item-icon" />
                <span class="menu-text">User List</span>
            </a>`
            
          : ``
        }
        ${
          isLoggedIn 
            ? 
            `<a href = "./login.html" onClick="logout()" class="menu-item flex flex-row items-center">
              <img src="assets/icons/logout.png" alt="logout" class="menu-item-icon" />
              <span class="menu-text">Log Out</span>
            </a>
            `
            : 
            `
            <a href = "./login.html" class="menu-item flex flex-row items-center
            ${location.href.includes("login.html") && `sidebar-selected`}"">
              <img src="assets/icons/login.png" alt="login" class="menu-item-icon" />
              <span class="menu-text">Log In</span>
            </a>

            <a href = "./register.html" class="menu-item flex flex-row items-center
            ${location.href.includes("register.html") && `sidebar-selected`}"">
              <img src="assets/icons/register.png" alt="register" class="menu-item-icon" />
              <span class="menu-text">Register</span>
            </a>
            `
        }

      </div>
    </nav>
  `;
};

try {
  var session_id = getCookie("PHPSESSID");
  if (session_id) {
    const formData = new FormData();
    formData.append("session_id", session_id);
    request("POST", "/api/auth/check_admin.php", formData, createNavbar);
  } else {
    createNavbar(JSON.stringify({ status: 401 }));
  }
} catch (error) {
  console.log(error);
  alert(error);
}
