const loginCallback = (data) => {
    const res = JSON.parse(data)
    const sentData = JSON.parse(res["data"]);
    
    if (res["status"] === 200) {
        alert(sentData["isadmin"])
        document.cookie = `${sentData["session_id"]};}`
        alert(document.cookie)
        if (sentData["isadmin"] == 1){
            window.location = "/admin/user_list.html"
            return;
        }

        window.location = "/main.html"
    } else {
        alert(res)
    }

    return;
}

const login = (event) => {
    event.preventDefault();

    document.getElementById("login-error-message").innerHTML = ""

    username = document.getElementById("username").value
    password = document.getElementById("password").value;

    try {
        const formData = new FormData(event.target);
        request("POST", "/api/auth/login.php", formData, loginCallback);
        return;
    } catch (err) {
        alert(err);
    }

}