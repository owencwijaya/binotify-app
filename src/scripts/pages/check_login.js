const checkLoginCallback = (data) => {
    const res = JSON.parse(data)
    let sentData;

    if (res["data"].length > 0){
        sentData = JSON.parse(res["data"])
    }

    const pathnames = ["/login.html", "/register.html"]

    if (res["status"] === 200 && pathnames.includes(window.location.pathname)) {
        localStorage.removeItem("played_songs");
        localStorage.removeItem("last_updated");
        window.location = "/index.html"
    } 
    return;
}


const checkLogin = () => {
    try {
        request("POST", "/api/auth/check_login.php", null, checkLoginCallback);
        return;
    
    } catch (err) {
        alert(err);
    }
}

window.onload = checkLogin();

