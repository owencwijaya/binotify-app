const loginCallback = (data) => {
    const res = JSON.parse(data)

    alert(res["message"]);

    if (res["status"] === 200) {
        window.location = "/main.html"
    } else {
        document.getElementById("login-error-message").innerHTML = message;
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
        request("POST", "/api/login.php", formData, loginCallback);
        return;
    } catch (err) {
        alert(err);
    }

}