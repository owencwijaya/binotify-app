const checkAdminCallback = (data) => {
    const res = JSON.parse(data)

    if (res["status"] !== 200) {
        location.href = "/index.html"
    }


    return true;
}


const checkAdmin = () => {
    try {
        var session_id = getCookie('session_id') || getCookie('PHPSESSID')

        if (session_id){
            const formData = new FormData();
            formData.append('session_id', session_id);
            request("POST", "/api/auth/check_admin.php", formData, checkAdminCallback);
        }

    } catch (err) {
        alert(err);
    }
}


window.onload = checkAdmin;

