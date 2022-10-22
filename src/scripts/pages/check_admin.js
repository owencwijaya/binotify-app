const checkAdminCallback = (data) => {
    const res = JSON.parse(data)

    if (res["status"] !== 200) {
        return false
    }
    return true;
}



try {
    var session_id = getCookie('session_id')


    if (session_id){
        const formData = new FormData();
        formData.append('session_id', getCookie("session_id"));
        request("POST", "/api/auth/check_admin.php", formData, checkLoginCallback);
    }

} catch (err) {
    alert(err);
}

