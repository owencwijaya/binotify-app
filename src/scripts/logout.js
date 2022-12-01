const logoutCallback = (data) => {
    const res = JSON.parse(data)

    if (res["status"] === 200) {
        document.cookie = "PHPSESSID=; Max-Age=-99999999;"
        document.cookie = "user_id=; Max-Age=-99999999;"
        sessionStorage.removeItem("user_id")
    } else {
        alert(res["message"])
    }
    return;
}

const logout = () => {
    try {
        request("POST", "/api/auth/logout.php", undefined, logoutCallback);
        return;
    } catch (err) {
        alert(err);
    }

}