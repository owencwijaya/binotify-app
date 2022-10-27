const onLoad = () => {
    checkLogin();

    getUsername();

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

    getSongs();
    getAlbums();
    createSearchBar();
}