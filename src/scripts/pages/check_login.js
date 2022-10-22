const checkLoginCallback = (data) => {
    const res = JSON.parse(data)
    const pathnames = ["/index.html", "/login.html", "/register.html"]

    if (res["status"] === 200 && pathnames.includes(window.location.pathname)) {
        window.location = "/main.html"
    } 

    if (res["status"] !== 200 && !pathnames.includes(window.location.pathname)) {

        window.location = "/index.html"
    }
    return;
}


const checkLogin = () => {
    try {
        var session_id = getCookie('session_id')
    
        if (session_id){
            const formData = new FormData();
            formData.append('session_id', getCookie("session_id"));
            request("POST", "/api/auth/check_login.php", formData, checkLoginCallback);
        }
    
        return;
    
    } catch (err) {
        alert(err);
    }
}

window.onload = checkLogin;

