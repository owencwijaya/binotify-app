const checkLoginCallback = (data) => {
    const res = JSON.parse(data)
    const sentData = JSON.parse(res["data"])
    const pathnames = ["/index.html", "/login.html", "/register.html"]

    if (res["status"] === 200 && pathnames.includes(window.location.pathname)) {
        if (sentData["isadmin"] == 1){
            window.location = "/admin/user_list.html"
            return;
        }
        window.location = "/main.html"
    } 

    if (res["status"] !== 200 && !pathnames.includes(window.location.pathname)) {
        window.location = "/index.html"
    }
    return;
}


const checkLogin = () => {
    try {
        var session_id = getCookie('session_id') || getCookie('PHPSESSID');
        if (session_id){
            const formData = new FormData();
            formData.append('session_id', session_id);
            request("POST", "/api/auth/check_login.php", formData, checkLoginCallback);
        }
    
        return;
    
    } catch (err) {
        alert(err);
    }
}

window.onload = checkLogin;

