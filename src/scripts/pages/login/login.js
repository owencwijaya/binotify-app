const loginCallback = (data) => {
    const res = JSON.parse(data)

    let sentData;
    if (res["data"].length > 0){
        sentData = JSON.parse(res["data"]);
    }
    
    if (res["status"] === 200) {
        window.location = "/index.html"
    } else {
        document.getElementById("login-error-message").innerHTML = res["message"]
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
        formData.append("session_id", getCookie('PHPSESSID') || "");
        request("POST", "/api/auth/login.php", formData, loginCallback);
        return;
    } catch (err) {
        alert(err);
    }

}