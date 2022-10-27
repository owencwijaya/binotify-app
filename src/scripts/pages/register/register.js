const registerCallback = (data) => {
    const res = JSON.parse(data)

    alert(res["message"]);

    if (res["status"] === 200) {
        window.location = "/login.html"
    } else {
        document.getElementById("register-error-message").innerHTML = res["message"];
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

    try {
        const formData = new FormData(event.target);
        formData.append("session_id", getCookie("PHPSESSID") || "")
        request("POST", "/api/auth/register.php", formData, registerCallback);
        return; 
    } catch (err) {
        alert(err);
    }
}

const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }


const registerd = debounce((event) => {
    register(event)
}, 500);