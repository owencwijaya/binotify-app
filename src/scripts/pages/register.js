
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


const registerCallback = (data) => {
    const res = JSON.parse(data)

    alert(res["message"]);

    if (res["status"] === 200) {
        window.location = "/login.html"
    } else {
        document.getElementById("register-error-message").innerHTML = message;
    }

    return;
}


const register = (event) => {
    event.preventDefault();

    document.getElementById("register-error-message").innerHTML = ""


    email = document.getElementById("email").value
    password = document.getElementById("password").value;
    confirmed_password = document.getElementById("confirm-password").value;

    // check password first
    if (password !== confirmed_password) {
        alert("Password mismatch! Please make sure the confirmed password matches the password");
        document.getElementById("register-error-message").innerHTML = "Password doesn't match";
        return;
    }

    // check email
    if (!validateEmail(email)) {
        alert("Invalid email; please input a valid email format!");
        document.getElementById("register-error-message").innerHTML = "E-mail invalid";
        return;
    }

    try {
        const formData = new FormData(event.target);
        request("POST", "/api/register.php", formData, registerCallback);
        return;
    } catch (err) {
        alert(err);
    }

}