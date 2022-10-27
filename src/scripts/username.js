const getUsernameCallback = (data) => {
  const res = JSON.parse(data);

  let sentData;

  if (res["data"].length > 0) {
    sentData = JSON.parse(res["data"]);
  }

  if (res["status"] === 200) {
    const usernameLocation = document.getElementById("username");
    usernameLocation.innerHTML = sentData["username"];
    usernameLocation.href = "#";
  }
  return;
};

const getUsername = () => {
  try {
    var session_id = getCookie("session_id") || getCookie("PHPSESSID");
    if (session_id) {
      const formData = new FormData();
      formData.append("session_id", session_id);
      request(
        "POST",
        "/api/auth/check_login.php",
        formData,
        getUsernameCallback
      );
    }

    return;
  } catch (err) {
    alert(err);
  }
};

getUsername();
