const loginCallback = (data) => {
    const res = JSON.parse(data)
    const sentData = JSON.parse(res["data"]);
    
    if (res["status"] === 200) {
        window.location = "/main.html"
        document.cookie = `${sentData["session_id"]};}`
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