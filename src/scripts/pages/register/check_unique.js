const checkUniqueCallback = (data) => {
    const res = JSON.parse(data)
    

    document.getElementById(`${res["data"]}-error-message`).innerHTML = res["message"];
    if (res["status"] === 200) {
        document.getElementById(res["data"]).style.border = "3px solid green";
    } else {
        document.getElementById(res["data"]).style.border = "3px solid red";
    }

    return;
}

const checkUnique = (event, column) => {
    event.preventDefault();

    const value = document.getElementById(column).value

    // check if username and email valid / invalid
    if (column ==='username' && !validateUsername(value)){
        document.getElementById(column).style.border = "3px solid red";
        document.getElementById(`${column}-error-message`).innerHTML= "Username must be a combination of A-Z, a-z, and _";
        return;
    }

    if (column ==='email' && !validateEmail(value)){
        document.getElementById(column).style.border = "3px solid red";
        document.getElementById(`${column}-error-message`).innerHTML= "Please provide a valid e-mail";
        return;
    }

    if (column === 'confirm-password' ){
        if (document.getElementById('password') !== document.getElementById('confirm-password')){
            document.getElementById(column).style.border = "3px solid red";
            document.getElementById(`${column}-error-message`).innerHTML= "Password doesn't match";
        } else {
            document.getElementById(column).style.border = "3px solid green";
            document.getElementById(`${column}-error-message`).innerHTML= "Password match";
        }

    }

    try {
        const formData = new FormData();
        formData.append('key', document.getElementById(column).value);
        formData.append('column', column)
        formData.append('session_id', getCookie('PHPSESSID') || '')

        request("POST", "/api/auth/check_unique.php", formData, checkUniqueCallback);
        return;
    } catch (err) {
        alert(err);
    }
}