const createNavbar = (data) => {
  const res = JSON.parse(data);
  const isAdmin = res["status"] == 200;
  const isLoggedIn = res["status"] == 401;

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
        ${
          isAdmin
            ? `
            <a href="add_songs.html" class="menu-item flex flex-row items-center
            ${location.href.includes("add_songs.html") && `sidebar-selected`}">
                <img src="assets/icons/add.png" alt="Add" class="menu-item-icon" />
                <span class="menu-text">Add Songs</span>
            </a>
            <a href="add_albums.html" class="menu-item flex flex-row items-center
            ${location.href.includes("add_albums.html") && `sidebar-selected`}">
                <img src="assets/icons/add.png" alt="Add" class="menu-item-icon" />
                <span class="menu-text">Add Albums</span>
            </a>
        `
            : `
            <a href="search.html?query=" class="menu-item flex flex-row items-center
            ${location.href.includes("search.html") && `sidebar-selected`}">
                <img src="assets/icons/search.png" alt="Search" class="menu-item-icon" />
                <span class="menu-text">Search</span>
            </a>
        `
        }
        <a href="list_albums.html" class="menu-item flex flex-row items-center
        ${location.href.includes("list_albums.html") && `sidebar-selected`}">
            <img src="assets/icons/library.png" alt="Albums" class="menu-item-icon" />
            <span class="menu-text">List Albums</span>
        </a>
        ${
          isLoggedIn ?
            `
            <a href = "./login.html" class="menu-item flex flex-row items-center">
              <img src="assets/icons/login.png" alt="login" class="menu-item-icon" />
              <span class="menu-text">Login</span>
            </a>

            <a href = "./register.html" class="menu-item flex flex-row items-center">
              <img src="assets/icons/register.png" alt="register" class="menu-item-icon" />
              <span class="menu-text">Register</span>
            </a>
            `
          :
           `<a href = "./index.html" onClick="logout()" class="menu-item flex flex-row items-center">
              <img src="assets/icons/logout.png" alt="logout" class="menu-item-icon" />
              <span class="menu-text">Log Out</span>
            </a>
            `
        }

      </div>
    </nav>
  `;
};

try {
  var session_id = getCookie("session_id") || getCookie("PHPSESSID");
  if (session_id) {
    const formData = new FormData();
    formData.append("session_id", session_id);
    request("POST", "/api/auth/check_admin.php", formData, createNavbar);
  }
} catch (error) {
  console.log(error);
  alert(error);
}
