const logoutCallback = (data) => {
    const res = JSON.parse(data)

    if (res["status"] === 200) {
        document.cookie += ";expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        localStorage.removeItem("user_id")
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